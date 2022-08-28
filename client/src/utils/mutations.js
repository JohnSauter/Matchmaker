/* mutations.js */

import { gql } from "@apollo/client";

/* Log in a user who has already signed up.  */
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

/* Sign up a new seeker or matchmaker.  */
export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
    $matchmaker: Boolean!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      matchmaker: $matchmaker
    ) {
      token
      user {
        _id
      }
    }
  }
`;

/* Update a seeker's profile.  */
export const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $gender: String!
    $age: Int!
    $height: Int!
    $weight: Int!
    $eyes: String!
    $hair: String!
    $aboutMe: String!
    $contactInfo: String!
  ) {
    updateProfile(
      gender: $gender
      age: $age
      height: $height
      weight: $weight
      eyes: $eyes
      hair: $hair
      aboutMe: $aboutMe
      contactInfo: $contactInfo
    ) {
      _id
    }
  }
`;

/* Update a seeker's wish list.  */
export const UPDATE_WISHLIST = gql`
  mutation updateWishList(
    $wishgen_male: Boolean!
    $wishgen_female: Boolean!
    $wishgen_nonbinary: Boolean!
    $minage: Int!
    $maxage: Int!
    $minheight: Int!
    $maxheight: Int!
    $minweight: Int!
    $maxweight: Int!
    $wisheye_brown: Boolean!
    $wisheye_blue: Boolean!
    $wisheye_gray: Boolean!
    $wisheye_green: Boolean!
    $wisheye_hazel: Boolean!
    $wishhair_black: Boolean!
    $wishhair_brown: Boolean!
    $wishhair_blond: Boolean!
    $wishhair_red: Boolean!
  ) {
    updateWishList(
      wishgen_male: $wishgen_male
      wishgen_female: $wishgen_female
      wishgen_nonbinary: $wishgen_nonbinary
      minage: $minage
      maxage: $maxage
      minheight: $minheight
      maxheight: $maxheight
      minweight: $minweight
      maxweight: $maxweight
      wisheye_brown: $wisheye_brown
      wisheye_blue: $wisheye_blue
      wisheye_gray: $wisheye_gray
      wisheye_green: $wisheye_green
      wisheye_hazel: $wisheye_hazel
      wishhair_black: $wishhair_black
      wishhair_brown: $wishhair_brown
      wishhair_blond: $wishhair_blond
      wishhair_red: $wishhair_red
    ) {
      _id
    }
  }
`;

/* Pay us for suggesting a match.  */
export const PAY = gql`
  mutation pay($card_number: String!) {
    pay(card_number: $card_number) {
      _id
    }
  }
`;

/* Rate a potential match.  */
export const RATE_A_MATCH = gql`
  mutation rateAMatch($PotentialMatchId: ID!, $rating: Int!) {
    rateAMatch(PotentialMatchId: $PotentialMatchId, rating: $rating) {
      _id
    }
  }
`;
/*

/* Choose a match.  */
export const CHOOSE_A_MATCH = gql`
  mutation choose_a_match($PotentialMatchId: ID!) {
    chooseAMatch(PotentialMatchId: $PotentialMatchId) {
      _id
    }
  }
`;

/* Reject the match.  */
export const REJECT_MATCH = gql`
  mutation reject_match {
    rejectMatch {
      _id
    }
  }
`;
