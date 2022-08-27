/* Rate_one.js */
/* Present a single potential match with all its details
 * so a matchmaker can decide how to rate it.  */

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_UNRATED_MATCHES } from "../utils/queries.js";
import { RATE_A_MATCH } from "../utils/mutations";

export function RateOne() {
  const params = useParams();
  const { loading, error, data } = useQuery(QUERY_UNRATED_MATCHES);
  const [rate_a_match] = useMutation(RATE_A_MATCH, {
    refetchQueries: [{ query: QUERY_UNRATED_MATCHES }],
  });
  const [rateForm, setRateForm] = useState({
    rated: false,
    rating: 0,
  });
  const navigate = useNavigate();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error</p>;
  }

  const goHome = () => {
    navigate("/");
  };

  const potential_matches = data.unRatedMatches;
  const match_id = params.PotentialMatchId;

  /* Find the specified match.  */
  const potential_match = potential_matches.filter(
    (element) => element._id === match_id
  )[0];

  /* Present the information about one of the seekers.  */
  function DisplayOneUser(props) {
    const user = props.user;
    return (
      <>
        <p>{user.username}</p>
        <p>gender: {user.gender}</p>
        <p>age: {user.age}</p>
        <p>height: {user.height}</p>
        <p>weight: {user.weight}</p>
        <p>eyes: {user.eyes}</p>
        <p>hair: {user.hair}</p>
        <p>About: {user.aboutMe}</p>
      </>
    );
  }

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setRateForm({
      ...rateForm,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const rateResponse = await rate_a_match({
      variables: {
        PotentialMatchId: match_id,
        rating: Number(rateForm.rating),
      },
    });
    console.log(rateResponse);
    goHome();
  };
  return (
    <div>
      <p>Rate_one</p>
      <DisplayOneUser user={potential_match.User1} />
      <DisplayOneUser user={potential_match.User2} />
      <form onSubmit={handleSubmit}>
        <label>
          Rate this match:
          <input
            name="rating"
            type="number"
            value={rateForm.age}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
