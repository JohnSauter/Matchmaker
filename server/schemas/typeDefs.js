const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type PotentialMatch {
    _id: ID
    name: String
  }

    type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    role: String
    match: Boolean
        }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    matches: [PotentialMatches]
        user: User
        allMyMatches:User
        unRatedMatches:User


     }

  type Mutation {
    rateAMatch(rating:integer)

    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        updateProfile(firstName: String, lastName: String, email: String, password: String): 
        updateWishList
        User login(email: String!, password: String!): Auth
        chargeMyCard
        matchChosen

  }
`;

module.exports = typeDefs;
