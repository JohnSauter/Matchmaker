/* Front.js */
/* Decide which page should be presented to the user
 * upon login or signup.  */

//import React, { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries.js";

//import { useAppContext } from "../utils/GlobalState";

//import { idbPromise } from "../utils/helpers";
//import spinner from "../assets/spinner.gif";

const { Login } = require("./Login.js");
const { RateList } = require("./Rate_list.js");
const { Profile } = require("./Profile.js");
const { Wishlist } = require("./Wishlist.js");
const { Pay } = require("./Pay.js");
const { ChooseList } = require("./Choose_list.js");
const { Chosen } = require("./Chosen.js");

export function Front() {
  const { loading, error, data } = useQuery(QUERY_USER);
  //const [state, dispatch] = useAppContext();
  //const navigate = useNavigate();
  if (loading) {
    return <Login />;
  }
  if (error) {
    return <Login />;
  }
  const user = data.user;
  if (!user) {
    return <Login />;
  }
  if (user.matchmaker) {
    return <RateList />;
  }
  if (!user.profile_specified) {
    return <Profile />;
  }
  if (!user.wishlist_specified) {
    return <Wishlist />;
  }
  if (!user.paid) {
    return <Pay />;
  }
  if (!user.match_found) {
    return <ChooseList />;
  }
  return <Chosen />;
}
