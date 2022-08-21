const { AuthenticationError } = require("apollo-server-express");
const { User, PotentialMatch } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    /* Get information about the current user.  */
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }
      throw new AuthenticationError("Must be logged in");
    },
    /* Get all of the potential matches for the logged-in user.  */
    allMyMatches: async (parent, args, context) => {
      const logged_in_user = context.user;
      if (!logged_in_user) {
        throw new AuthenticationError("Must be logged in.");
      }
      const user_id = logged_in_user._id;

      const potential_matches = await PotentialMatch.find({
        rated: true,
        rating: { $gt: 0 },
      });

      /* Filter out matches not involving this user.
       * Perhaps this can be done in the query instead.
       */
      filtered_matches = potential_matches.filter((element) => {
        if (element.user1 == user_id) {
          return true;
        }
        if (element.user2 == user_id) {
          return true;
        }
        return false;
      });
      return filtered_matches;
    },
    /* Get all unrated matches for the matchmaker.  */
    unRatedMatches: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("Must be logged in.");
      }
      const potential_matches = await PotentialMatch.find({ rated: false });
      return potential_matches;
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
      const user = context.user;
      if (!user) {
        throw new AuthenticationError("Must be logged in.");
      }
      if (!user.matchmaker) {
        throw new AuthenticationError("Only a matchmaker can do this.");
      }
      const match_id = args.potentialMatchID;
      const rating = args.rating;
      const updated_match = await User.findOneAndUpdate(
        { _id: match_id },
        {
          $set: {
            rating: rating,
            rated: true,
          },
        }
      );
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
      if (logged_in_user.matchmaker) {
        throw new AuthenticationError("Only a seeker can do this.");
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
        { _id: logged_in_user._id },
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
      if (logged_in_user.matchmaker) {
        throw new AuthenticationError("Only a seeker can do this.");
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
      const wishhair_dark = args.wishhair_dark;
      const wishhair_blond = args.wishhair_blond;
      const wishhair_red = args.wishhair_red;
      const updated_user = await User.findOneAndUpdate(
        { _id: logged_in_user._id },
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
            wishhair_dark: wishhair_dark,
            wishhair_blond: wishhair_blond,
            wishhair_red: wishhair_red,
          },
        },
        { new: true }
      );
      /* Delete this user's matches and recompute potential matches.  */
      return updated_user;
    },
    /* Pay invokes the billing system.  */
    pay: async (parent, args, context) => {
      const logged_in_user = context.user;
      if (!logged_in_user) {
        throw new AuthenticationError("Must be logged in.");
      }
      if (logged_in_user.matchmaker) {
        throw new AuthenticationError("Only a seeker can do this.");
      }
      /* Invoke the credit card payment software.  */
      const updated_user = await User.findOneAndUpdate(
        { _id: logged_in_user._id },
        {
          $set: {
            paid: true,
          },
        },
        { new: true }
      );
      return updated_user;
    },
  },
};

module.exports = resolvers;
