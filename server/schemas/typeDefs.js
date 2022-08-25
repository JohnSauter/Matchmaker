const { gql } = require("apollo-server-express");

const typeDefs = gql`
 
  # The matchmaker and the seeker when looking at 
  # other users' information do not get the contact 
  # information.
  type LimitedUser {
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

    eyes: String
    hair: String
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
    wisheye_brown: Boolean
    wisheye_blue: Boolean
    whisheye_gray: Boolean
    wisheye_green: Boolean
    wisheye_hazel: Boolean
    wishhair_black: Boolean
    wishhair_brown: Boolean
    wishhair_blond: Boolean
    wishhair_red: Boolean
    paid: Boolean!
    match_found: Boolean!
    found_match: LimitedUser
  }

  # When the seeker is looking at himself he gets his own 
  # and his match's contact information.
  type FullUser {
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
    eyes: String
    hair: String
    aboutMe: String
    contactInfo: String
    # wish list
    wishlist_specified: Boolean!
    wishgen_male: Boolean
    wishgen_female: Boolean
    minage: Int
    maxage: Int
    minheight: Int
    maxheight: Int
    minweight: Int
    maxweight: Int
    wisheye_brown: Boolean
    wisheye_blue: Boolean
    whisheye_gray: Boolean
    wisheye_green: Boolean
    wisheye_hazel: Boolean
    wishhair_black: Boolean
    wishhair_brown: Boolean
    wishhair_blond: Boolean
    wishhair_red: Boolean
    paid: Boolean!
    match_found: Boolean!
    found_match: FullUser
  }

  type Auth {
    token: ID
    user: FullUser
  }
  type PotentialMatch {
    _id: ID
    User1: LimitedUser
    User2: LimitedUser
    rating: Int
  }

  type Query {
    user: FullUser
    allMyPotentialMatches: [PotentialMatch]
    unRatedMatches: [PotentialMatch]
    myMatch: String
  }

  type Mutation {
    rateAMatch(PotentialMatchId: ID, rating: Int): PotentialMatch

    chooseAMatch(PotentialMatchId: ID): FullUser

    rejectMatch: FullUser

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
      eyes: String
      hair: String
      aboutMe: String
      contactInfo: String
    ): FullUser

    updateWishList(
      wishgen: String
      minage: Int
      maxage: Int
      minheight: Int
      maxheight: Int
      minweight: Int
      maxweight: Int
      wisheye_brown: Boolean
      wisheye_blue: Boolean
      whisheye_gray: Boolean
      wisheye_green: Boolean
      wisheye_hazel: Boolean
      wishhair_black: Boolean
      wishhair_brown: Boolean
      wishhair_blond: Boolean
      wishhair_red: Boolean
    ): FullUser

    pay(card_number: String!): FullUser

    login(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
