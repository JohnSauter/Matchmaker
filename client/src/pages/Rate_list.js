/* Rate_list.js */
/* Present the list of unrated potential matches
 * so a matchmaker can select one for closer examination.  */

//import React, { useEffect, useState } from "react";
//import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_UNRATED_MATCHES } from "../utils/queries.js";

//import { useAppContext } from "../utils/GlobalState";
//import { idbPromise } from "../utils/helpers";
//import spinner from "../assets/spinner.gif";

export function RateList() {
  const { loading, error, data } = useQuery(QUERY_UNRATED_MATCHES);
  //const [state, dispatch] = useAppContext();
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error</p>;
  }
  const potential_matches = data.unRatedMatches;
  
  /* List the matches.  */
  return (
    <ul>
      {potential_matches.map((potential_match) => (
        <li>
          {potential_match.User1.username} and {potential_match.User2.username}
        </li>
      ))}
    </ul>
  );
}
