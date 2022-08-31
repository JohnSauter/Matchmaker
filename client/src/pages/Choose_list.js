/* Choose_list.js */
/* Present the list of this seeker's potential matches.
 */

//import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_MY_POTENTIAL_MATCHES } from "../utils/queries.js";

//import { useAppContext } from "../utils/GlobalState";
//import { idbPromise } from "../utils/helpers";
//import spinner from "../assets/spinner.gif";

export function ChooseList() {
  const { loading, error, data } = useQuery(QUERY_ALL_MY_POTENTIAL_MATCHES);
  //const [state, dispatch] = useAppContext();
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error</p>;
  }
  const potential_matches = data.allMyPotentialMatches;

  /* If there are no matches, say so.  */
  if (potential_matches.length === 0) {
    return <p>No matches for you.</p>
  }

  /* List the matches.  */
  return (
    <>
    <h3>Here are the matches that have been approved
      by a matchmaker.  Click on one to see details.
    </h3>
    <ul>
      {potential_matches.map((potential_match) => (
        <li key={potential_match._id}>
          <Link to={"/choose_one/" + potential_match._id}>
            {potential_match.User1.username} and{" "}
            {potential_match.User2.username}
          </Link>
        </li>
      ))}
    </ul>
    </>
  );
}
