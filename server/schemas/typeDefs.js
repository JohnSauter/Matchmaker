const { gql } = require('apollo-server-express');

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
  height:  String
  weight: Int
  eyes:  String
  hair:  String          
  }

  type Wishlist {
    userid: User
    wishgen:String
    minage: Int
    maxage: Int
    minheight: String
    maxheight: String
    minweight: String
    maxweight: String
    wisheye: String
    wishhair:String
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
    rateAMatch (rating:integer):

    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
       
    updateProfile(userid: User, gender: String, age: Int, height:  String, weight: Int, eyes: String, hair:  String): 
       
    updateWishList (userid: User, wishgen:String, minage: Int,maxage: Int,minheight: String,maxheight: String,minweight: String, maxweight: String, wisheye: String, wishhair:String )
        
    updatelogin(email: String!, password: String!): Auth
        
    chargeMyCard
        
    matchChosen

  }
`;

module.exports = typeDefs;
