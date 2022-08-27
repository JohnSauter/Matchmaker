/* queries.js */

import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user {
    user {
      _id
      username
      email
      matchmaker
      profile_specified
      gender
      age
      height
      weight
      eyes
      hair
      aboutMe
      contactInfo
      wishlist_specified
      wishgen_male
      wishgen_female
      minage
      maxage
      minheight
      maxheight
      minweight
      maxweight
      wisheye_brown
      wisheye_blue
      whisheye_gray
      wisheye_green
      wisheye_hazel
      wishhair_black
      wishhair_brown
      wishhair_blond
      wishhair_red
      paid
      match_found
      found_match {
        _id
        username
        email
        matchmaker
        profile_specified
        gender
        age
        height
        weight
        eyes
        hair
        aboutMe
        contactInfo
        wishlist_specified
        wishgen_male
        wishgen_female
        minage
        maxage
        minheight
        maxheight
        minweight
        maxweight
        wisheye_brown
        wisheye_blue
        whisheye_gray
        wisheye_green
        wisheye_hazel
        wishhair_black
        wishhair_brown
        wishhair_blond
        wishhair_red
        paid
        match_found
      }
    }
  }
`;

export const QUERY_ALL_MY_POTENTIAL_MATCHES = gql`
  query all_my_potential_matches {
    PotentialMatch {
      _id
      user1 {
        _id
        username
        email
        matchmaker
        profile_specified
        gender
        age
        height
        weight
        eyes
        hair
        aboutMe
        wishlist_specified
        wishgen_male
        wishgen_female
        minage
        maxage
        minheight
        maxheight
        minweight
        maxweight
        wisheye_brown
        wisheye_blue
        whisheye_gray
        wisheye_green
        wisheye_hazel
        wishhair_black
        wishhair_brown
        wishhair_blond
        wishhair_red
        paid
        match_found
      }
      user2 {
        _id
        username
        email
        matchmaker
        profile_specified
        gender
        age
        height
        weight
        eyes
        hair
        aboutMe
        wishlist_specified
        wishgen_male
        wishgen_female
        minage
        maxage
        minheight
        maxheight
        minweight
        maxweight
        wisheye_brown
        wisheye_blue
        whisheye_gray
        wisheye_green
        wisheye_hazel
        wishhair_black
        wishhair_brown
        wishhair_blond
        wishhair_red
        paid
        match_found
      }
      rating
    }
  }
`;

export const QUERY_UNRATED_MATCHES = gql`
  query unrated_matches {
    unRatedMatches {
      _id
      User1 {
        _id
        username
        email
        matchmaker
        profile_specified
        gender
        age
        height
        weight
        eyes
        hair
        aboutMe
        wishlist_specified
        wishgen_male
        wishgen_female
        wishgen_nonbinary
        minage
        maxage
        minheight
        maxheight
        minweight
        maxweight
        wisheye_brown
        wisheye_blue
        whisheye_gray
        wisheye_green
        wisheye_hazel
        wishhair_black
        wishhair_brown
        wishhair_blond
        wishhair_red
        paid
        match_found
      }
      User2 {
        _id
        username
        email
        matchmaker
        profile_specified
        gender
        age
        height
        weight
        eyes
        hair
        aboutMe
        wishlist_specified
        wishgen_male
        wishgen_female
        wishgen_nonbinary
        minage
        maxage
        minheight
        maxheight
        minweight
        maxweight
        wisheye_brown
        wisheye_blue
        whisheye_gray
        wisheye_green
        wisheye_hazel
        wishhair_black
        wishhair_brown
        wishhair_blond
        wishhair_red
        paid
        match_found
      }
    }
  }
`;

/* The contact information for my match, or the empty string.  */
export const QUERY_MY_MATCH = gql`
  query mt_match {
    my_match {
      contact_info
    }
  }
`;
