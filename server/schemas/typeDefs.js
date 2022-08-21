const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type PotentialMatch {
    _id: ID
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    role: String
    match: Boolean
  }

  type Profile {
    userid: User
    gender: String
    age: Int
    height: String
    weight: Int
    eyes: String
    hair: String
  }

  type Wishlist {
    userid: User
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

  type Matchrate {
    rating: Int
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    matches: [PotentialMatch]
    user: User
    allMyMatches: User
    unRatedMatches: User
  }

  type Mutation {
    rateAMatch(rating: Int): Matchrate

    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth

    updateProfile(
      gender: String
      age: Int
      height: String
      weight: Int
      eyes: String
      hair: String
    ): Profile

    updateWishList(
      wishgen: String
      minage: Int
      maxage: Int
      minheight: String
      maxheight: String
      Intminweight: String
      maxweight: String
      wisheye: String
      wishhair: String
    ): Wishlist

    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
