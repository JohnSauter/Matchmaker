/* Rate_one.js */
/* Present a single potential match with all its details
 * so a matchmaker can decide how to rate it.  */

//import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_UNRATED_MATCHES } from "../utils/queries.js";

//import { useAppContext } from "../utils/GlobalState";

//import { idbPromise } from "../utils/helpers";
//import spinner from "../assets/spinner.gif";

export function RateOne() {
  const params = useParams();
  const { loading, error, data } = useQuery(QUERY_UNRATED_MATCHES);
  //const [state, dispatch] = useAppContext();
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error</p>;
  }

  const potential_matches = data.unRatedMatches;
  const match_id = params.PotentialMatchId;
   /* Find the specified match.  */

  const potential_match = potential_matches.filter(
    (element) => element._id === match_id
  )[0];

  return (
    <div>
      <p>Rate_one: {potential_match.User1.username}</p>
    </div>
  );
}
