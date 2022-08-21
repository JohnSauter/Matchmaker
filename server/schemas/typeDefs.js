const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    role: String
    matchmaker: Boolean
    # Profile
    gender: String
    age: Int
    height: String
    weight: Int
    eyes: String
    hair: String
    # wish list
    wishgen: String
    minage: Int
    maxage: Int
    minheight: String
    maxheight: String
    minweight: String
    maxweight: String
    wisheye: String
    wishhair: String
  }

  type Auth {
    token: ID
    user: User
  }
  type PotentialMatch {
    _id: ID
    User1: User
    User2: User
    rating: Int
  }
  type Query {
    user: User
    allMyMatches: [PotentialMatch]
    unRatedMatches: [PotentialMatch]
  }

  type Mutation {
    rateAMatch(PotentialMatchId: ID, rating: Int): PotentialMatch

    addUser(userName: String!, email: String!, password: String!): Auth

    updateProfile(
      gender: String
      age: Int
      height: Int
      weight: Int
      eyes: String
      hair: String
      aboutMe: String
      contactInfo: String
    ): User

    updateWishList(
      wishgen: String
      minage: Int
      maxage: Int
      minheight: Int
      maxheight: Int
      minweight: Int
      maxweight: Int
      wisheye_blue: Boolean
      wisheye_brown: Boolean
      wishhair_dark: Boolean
      wishhair_blond: Boolean
      wishhair_red: Boolean
    ): User

    login(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
