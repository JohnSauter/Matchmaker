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
      throw new AuthenticationError("Not logged in");
    },
    /* Get all of the potential matches for the logged-in user.  */
    allMyMatches: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("Must be logged in.");
      }
      throw new AuthenticationError("Not implemented.");
    },
    /* Get all unrated matches for the matchmaker.  */
    unRatedMatches: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("Must be logged in.");
      }
      throw new AuthenticationError("Not implemented.");
    },
  },
  Mutation: {
    /* Sign up a new user. */
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    /* Log in an old user.  */
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

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
      if (!context.user) {
        throw new AuthenticationError("Must be logged in.");
      }
      throw new AuthenticationError("Not implemented.");
    },

    /* Update a user's profile.
     * A seeker specifies information about himself.
     * Input is those details, output is the updated user.
     * All potential matches involving this user are deleted
     * and recomputed based on the new information.
     */
    updateProfile: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("Must be logged in.");
      }
      throw new AuthenticationError("Not implemented.");
    },
    /* Update a user's wish list.
     * A seeker specifies information about the kind of person
     * he is looking for.  Input is those details, output is
     * the updated user.  All potential matches involving
     * this user are deleted and recomputed based on the
     * new information.
     */

    updateWishList: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("Must be logged in.");
      }
      throw new AuthenticationError("Not implemented.");
    },
  },
};

module.exports = resolvers;
