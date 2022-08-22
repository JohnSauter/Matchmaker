const { gql } = require("apollo-server-express");

const typeDefs = gql`
  enum hair_color {
    brown
    black
    blond
    red
  }
  enum eye_color {
    blue
    brown
    green
    gray
      }

  type User {
    _id: ID
    username: String!
    email: String!
    matchmaker: Boolean!
    # Profile
    profile_specified: Boolean
    gender: String
    age: Int
    height: Int
    weight: Int
    eyes: eye_color
    hair: hair_color
    aboutMe: String
    # wish list
    wishlist_specified: Boolean!
    wishgen_male: Boolean
    wishgen_female: Boolean
    wishgen_nonbinary: Boolean
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
    paid: Boolean!
    match_found: Boolean!
    found_match: User
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
    chooseMatch

    addUser(
      username: String!
      email: String!
      password: String!
      matchmaker: Boolean!
    ): Auth

    updateProfile(
      gender: String
      age: Int
      height: Int
      weight: Int
      eyes: eye_color
      hair: hair_color
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

    pay(card_number: String!): User

    login(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
