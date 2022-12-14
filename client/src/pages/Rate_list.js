/* Rate_list.js */
/* Present the list of unrated potential matches
 * so a matchmaker can select one for closer examination.  */

//import React, { useEffect, useState } from "react";
import Jumbotron from "../components/Jumbotron";
import { Link } from "react-router-dom";
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

  /* If there are no matches, say so.  */
  if (potential_matches.length === 0) {
    return (
      <Jumbotron>
        <h1>There are no potential matches to rate.</h1>
      </Jumbotron>
    );
  }

  /* List the matches.  */
  return (<>
  <h2>Click on a potential match to see its details.</h2>
    <ul>
      {potential_matches.map((potential_match) => (
        <li key={potential_match._id}>
          <Link to={"/rate_one/" + potential_match._id}>
            {potential_match.User1.username} and{" "}
            {potential_match.User2.username}
          </Link>
        </li>
      ))}
    </ul>
    </>
  );
}
