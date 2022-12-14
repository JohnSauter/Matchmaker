const { AuthenticationError } = require("apollo-server-express");
const { User, PotentialMatch } = require("../models");
const { signToken } = require("../utils/auth.js");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
const { match_recompute } = require("../utils/make_matches.js");
const { match_email, reject_email } = require("../utils/mailer.js");
const mongoose = require("mongoose");
const collect_payment = require("../utils/collect_payment.js");

const resolvers = {
  Query: {
    /* Get information about the current user.
     * to simplify the navigator, return null if
     * there is not a login.  */
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate(
          "found_match"
        );
        return user;
      }
      return null;
    },

    /* Get all of the potential matches for the logged-in user.  */
    allMyPotentialMatches: async (parent, args, context) => {
      const logged_in_user = context.user;
      if (!logged_in_user) {
        throw new AuthenticationError("Must be logged in.");
      }
      const user_id = logged_in_user._id;
      if (!user_id) {
        throw new AuthenticationError("Must be logged in.");
      }
      const user = await User.findById(user_id);
      if (!user) {
        throw new AuthenticationError("Unknown user.");
      }
      if (user.matchmaker) {
        throw new AuthenticationError("Only seekers have potential matches.");
      }

      const potential_matches = await PotentialMatch.find({
        rated: true,
        rating: { $gt: 0 },
      })
        .populate("User1")
        .populate("User2");

      /* Filter out matches not involving this user.
       * Perhaps this can be done in the query instead.
       */
      filtered_matches = potential_matches.filter((element) => {
        if (element.User1._id == user_id) {
          return true;
        }
        if (element.User2._id == user_id) {
          return true;
        }
        return false;
      });
      return filtered_matches;
    },

    /* Get all unrated matches for the matchmaker.  */
    unRatedMatches: async (parent, args, context) => {
      const logged_in_user = context.user;
      if (!logged_in_user) {
        throw new AuthenticationError("Must be logged in.");
      }
      const user_id = logged_in_user._id;
      if (!user_id) {
        throw new AuthenticationError("Must be logged in.");
      }
      const user = await User.findById(user_id);
      if (!user) {
        throw new AuthenticationError("Unknown user.");
      }
      if (!user.matchmaker) {
        throw new AuthenticationError(
          "Only matchmakers can see unrated matches."
        );
      }

      /* Return an array of potential matches that have not yet been rated.  */
      const potential_matches = await PotentialMatch.find({
        rated: false,
      })
        .populate("User1")
        .populate("User2");
      return potential_matches;
    },

    /* If we already have a match, return the contact information
     * for the user we are matched against.
     * Otherwise return the empty string.  */
    myMatch: async (parent, args, context) => {
      const logged_in_user = context.user;
      if (!logged_in_user) {
        throw new AuthenticationError("Must be logged in.");
      }
      const user_id = logged_in_user._id;
      if (!user_id) {
        throw new AuthenticationError("Must be logged in.");
      }
      const user = await User.findById(user_id);
      if (!user) {
        throw new AuthenticationError("Unknown user.");
      }
      if (user.matchmaker) {
        throw new AuthenticationError("Only a seeker can have a match.");
      }

      if (user.match_found) {
        const other_user_id = user.found_match;
        const other_user = User.findById(other_user_id);
        if (!other_user) {
          return "";
        }
        return other_user.ContactInfo;
      } else {
        return "";
      }
    },
  },
  Mutation: {
    /* Sign up a new user. */
    addUser: async (parent, args) => {
      const username = args.username;
      const email = args.email;
      const password = args.password;
      const matchmaker = args.matchmaker;
      const new_user = {
        username,
        email,
        password,
        matchmaker,
        wishlist_specified: false,
        profile_specified: false,
        paid: false,
        match_found: false,
        gender: "nonbinary",
        age: 0,
        height: 0,
        weight: 0,
        eyes: "",
        hair: "",
        aboutMe: "",
        contactInfo: "",
        wishgen_male: true,
        wishgen_female: true,
        wishgen_nonbinary: true,
        minage: 18,
        maxage: 100,
        minheight: 0,
        maxheight: 100,
        minweight: 0,
        maxweight: 1000,
        wisheye_brown: true,
        wisheye_blue: true,
        wisheye_gray: true,
        wisheye_green: true,
        wisheye_hazel: true,
        wishhair_black: true,
        wishhair_brown: true,
        wishhair_blond: true,
        wishhair_red: true,
      };
      const user = await User.create(new_user);
      const token = signToken(user);

      return { token, user };
    },

    /* Log in an old user.  */
    login: async (parent, args, content) => {
      const username = args.username;
      const password = args.password;
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    /* Rate a potential match.
     * This is used by the matchmaker to specify the rating
     * for a potential match.  Inputs are the ID of the potential
     * match and the rating.  Output is the updated potential match.
     */
    rateAMatch: async (parent, args, context) => {
      const logged_in_user = context.user;
      if (!logged_in_user) {
        throw new AuthenticationError("Must be logged in.");
      }
      const user_id = logged_in_user._id;
      if (!user_id) {
        throw new AuthenticationError("Must be logged in.");
      }
      const user = await User.findById(user_id);
      if (!user) {
        throw new AuthenticationError("Unknown user.");
      }
      if (!user.matchmaker) {
        throw new AuthenticationError("Only a matchmaker can rate a match.");
      }

      const match_id = args.PotentialMatchId;
      const rating = args.rating;
      const updated_match = await PotentialMatch.findOneAndUpdate(
        { _id: match_id },
        {
          $set: {
            rating: rating,
            rated: true,
          },
        },
        { new: true }
      )
        .populate("User1")
        .populate("User2");

      return updated_match;
    },

    /* Update a user's profile.
     * A seeker specifies information about himself.
     * Input is those details, output is the updated user.
     * All potential matches involving this user are deleted
     * and recomputed based on the new information.
     */
    updateProfile: async (parent, args, context) => {
      const logged_in_user = context.user;
      if (!logged_in_user) {
        throw new AuthenticationError("Must be logged in.");
      }
      const user_id = logged_in_user._id;
      if (!user_id) {
        throw new AuthenticationError("Must be logged in.");
      }
      const user = await User.findById(user_id);
      if (!user) {
        throw new AuthenticationError("Unknown user.");
      }
      if (user.matchmaker) {
        throw new AuthenticationError("Only a seeker has a profile.");
      }

      const gender = args.gender;
      const age = args.age;
      const height = args.height;
      const weight = args.weight;
      const eyes = args.eyes;
      const hair = args.hair;
      const aboutMe = args.aboutMe;
      const contactInfo = args.contactInfo;
      const updated_user = await User.findOneAndUpdate(
        { _id: user_id },
        {
          $set: {
            profile_specified: true,
            gender: gender,
            age: age,
            height: height,
            weight: weight,
            eyes: eyes,
            hair: hair,
            aboutMe: aboutMe,
            contactInfo: contactInfo,
          },
        },
        { new: true }
      );

      /* Delete this user's matches and recompute potential matches.  */
      await match_recompute([user_id]);

      return updated_user;
    },

    /* Update a user's wish list.
     * A seeker specifies information about the kind of person
     * he is looking for.  Input is those details, output is
     * the updated user.  All potential matches involving
     * this user are deleted and recomputed based on the
     * new information.
     */
    updateWishList: async (parent, args, context) => {
      const logged_in_user = context.user;
      if (!logged_in_user) {
        throw new AuthenticationError("Must be logged in.");
      }
      const user_id = logged_in_user._id;
      if (!user_id) {
        throw new AuthenticationError("Must be logged in.");
      }
      const user = await User.findById(user_id);
      if (!user) {
        throw new AuthenticationError("Unknown user.");
      }
      if (user.matchmaker) {
        throw new AuthenticationError("Only a seeker has a wish list.");
      }

      const wishgen_male = args.wishgen_male;
      const wishgen_female = args.wishgen_female;
      const minage = args.minage;
      const maxage = args.maxage;
      const minheight = args.minheight;
      const maxheight = args.maxheight;
      const minweight = args.minweight;
      const maxweight = args.maxweight;
      const wisheye_brown = args.wisheye_brown;
      const wisheye_blue = args.wisheye_blue;
      const wisheye_gray = args.wisheye_gray;
      const wisheye_green = args.wisheye_green;
      const wisheye_hazel = args.wisheye_hazel;
      const wishhair_black = args.wishhair_black;
      const wishhair_brown = args.wishhair_brown;
      const wishhair_blond = args.wishhair_blond;
      const wishhair_red = args.wishhair_red;
      const updated_user = await User.findOneAndUpdate(
        { _id: user_id },
        {
          $set: {
            wishlist_specified: true,
            wishgen_male: wishgen_male,
            wishgen_female: wishgen_female,
            minage: minage,
            maxage: maxage,
            minheight: minheight,
            maxheight: maxheight,
            minweight: minweight,
            maxweight: maxweight,
            wisheye_brown: wisheye_brown,
            wisheye_blue: wisheye_blue,
            wisheye_gray: wisheye_gray,
            wisheye_green: wisheye_green,
            wisheye_hazel: wisheye_hazel,
            wishhair_black: wishhair_black,
            wishhair_brown: wishhair_brown,
            wishhair_blond: wishhair_blond,
            wishhair_red: wishhair_red,
          },
        },
        { new: true }
      );

      /* Delete this user's matches and recompute potential matches.  */
      await match_recompute([user_id]);

      return updated_user;
    },

    /* Pay invokes the billing system.  */
    pay: async (parent, args, context) => {
      const logged_in_user = context.user;
      if (!logged_in_user) {
        throw new AuthenticationError("Must be logged in.");
      }
      const user_id = logged_in_user._id;
      if (!user_id) {
        throw new AuthenticationError("Must be logged in.");
      }
      const user = await User.findById(user_id);
      if (!user) {
        throw new AuthenticationError("Unknown user.");
      }
      if (user.matchmaker) {
        throw new AuthenticationError("Only a seeker needs to pay.");
      }

      /* Invoke the credit card payment software.  */
      const collect_result = await collect_payment(context);
      if (collect_result.success != 1) {
        return collect_result.message;
      }

      /* If the charge was successful, flag the seeker as having paid.
       */
      const updated_user = await User.findOneAndUpdate(
        { _id: user_id },
        {
          $set: {
            paid: true,
          },
        },
        { new: true }
      );

      /* Now that this seeker is paid, he may have some potential matches.
       */
      await match_recompute([user_id]);

      return collect_result.stripe_session_id;
    },

    /* The seeker has found a companion.  */
    chooseAMatch: async (parent, args, context) => {
      const logged_in_user = context.user;
      if (!logged_in_user) {
        throw new AuthenticationError("Must be logged in.");
      }
      const user_id_string = logged_in_user._id;

      if (!user_id_string) {
        throw new AuthenticationError("Must be logged in.");
      }
      const user = await User.findById(user_id_string);
      if (!user) {
        throw new AuthenticationError("Unknown user.");
      }
      if (user.matchmaker) {
        throw new AuthenticationError("Only a seeker can choose a match.");
      }
      const user_id = user._id;

      /* Get the id of the user we are being matched to.  */
      const match_id = args.PotentialMatchId;
      if (!match_id) {
        throw new AuthenticationError("No match specified.");
      }
      const the_match = await PotentialMatch.findById(match_id)
        .populate("User1")
        .populate("User2");
      if (!the_match) {
        throw new AuthenticationError("Invalid match specified.");
      }

      /* A potential match has two users.  One of them is us;
       * find the other one.  */
      const user_1 = the_match.User1;
      const user_1_id = user_1._id;
      const user_1_id_string = user_1_id.toString();
      const user_2 = the_match.User2;
      const user_2_id = user_2._id;
      const user_2_id_string = user_2_id.toString();
      let other_user = user_1;
      let other_user_id = user_1_id;
      let other_user_id_string = user_1_id_string;
      if (other_user_id_string == user_id_string) {
        other_user = user_2;
        other_user_id = user_2_id;
        other_user_id_string = user_2_id_string;
      }

      if (!other_user_id_string) {
        throw new AuthenticationError("Invalid other user specified.");
      }

      /* Tell each user that the other is their match.  */
      const updated_user = await User.findOneAndUpdate(
        { _id: user_id },
        {
          $set: {
            found_match: other_user_id,
            match_found: true,
          },
        },
        { new: true }
      ).populate("found_match");

      const updated_other_user = await User.findOneAndUpdate(
        { _id: other_user_id },
        {
          $set: {
            found_match: user_id,
            match_found: true,
          },
        },
        { new: true }
      ).populate("found_match");

      /* Send e-mail to each user saying that they are matched.  */
      await match_email(updated_user, updated_other_user);

      /* These two seekers are no longer eligible for matching.  */
      await match_recompute([user_id, other_user_id]);

      /* Return the contact information for the matched seeker
       * in user.found_match.contactInfo.  */
      return updated_user;
    },

    /* The seeker has rejected his match.  */
    rejectMatch: async (parent, args, context) => {
      const logged_in_user = context.user;
      if (!logged_in_user) {
        throw new AuthenticationError("Must be logged in.");
      }
      const user_id = logged_in_user._id;
      if (!user_id) {
        throw new AuthenticationError("Must be logged in.");
      }
      const user = await User.findById(user_id);
      if (!user) {
        throw new AuthenticationError("Unknown user.");
      }
      if (user.matchmaker) {
        throw new AuthenticationError("Only a seeker can reject a match.");
      }
      if (!user.match_found) {
        throw new AuthenticationError(
          "Only matched seekers can reject their match."
        );
      }

      const other_user_id = user.found_match;
      if (!other_user_id) {
        throw new AuthenticationError("Invalid matched seeker.");
      }

      /* Tell each user that he is no longer matched.  */
      const updated_user = await User.findOneAndUpdate(
        { _id: user_id },
        {
          $set: {
            found_match: null,
            match_found: false,
            paid: false,
          },
        },
        { new: true }
      ).populate("found_match");

      const updated_other_user = await User.findOneAndUpdate(
        { _id: other_user_id },
        {
          $set: {
            found_match: null,
            match_found: false,
            paid: false,
          },
        },
        { new: true }
      ).populate("found_match");

      /* Send email to each user saying he is no longer matched.  */
      await reject_email(updated_user, updated_other_user);

      /* It is probably unnecessary, but make sure these seekers are not
       * matched until they pay again.  */
      await match_recompute([user_id, other_user_id]);

      return updated_user;
    },
  },
};

module.exports = resolvers;
