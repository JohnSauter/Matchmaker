/* Choose_one.js */
/* Present a single potential match with all its details.  */

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  QUERY_ALL_MY_POTENTIAL_MATCHES,
  QUERY_USER,
} from "../utils/queries.js";
import { CHOOSE_A_MATCH } from "../utils/mutations";

export function ChooseOne() {
  const params = useParams();
  const match_query = useQuery(QUERY_ALL_MY_POTENTIAL_MATCHES);
  const user_query = useQuery(QUERY_USER);
  const [choose_a_match] = useMutation(CHOOSE_A_MATCH, {
    refetchQueries: [
      { query: QUERY_ALL_MY_POTENTIAL_MATCHES },
      { query: QUERY_USER },
    ],
  });
  const [chooseForm, setChooseForm] = useState({
    chosen: false,
  });

  const navigate = useNavigate();

  /* Wait for both queries to complete.  */
  if (match_query.loading || user_query.loading) {
    return <p>Loading...</p>;
  }
  if (match_query.error || user_query.error) {
    return <p>Error</p>;
  }

  const goHome = () => {
    navigate("/");
  };

  const potential_matches = match_query.data.allMyPotentialMatches;
  const match_id = params.PotentialMatchId;

  /* Find the specified match.  */
  const potential_match = potential_matches.filter(
    (element) => element._id === match_id
  )[0];

  /* Figure out which matched user isn't us.  */
  let other_user = null;
  const user1 = potential_match.User1;
  const user1_id = user1._id;
  const user2 = potential_match.User2;
  const user2_id = user2._id;
  const user_id = user_query.data.user._id;
  if (user_id === user1_id) {
    other_user = user2;
  }
  if (user_id === user2_id) {
    other_user = user1;
  }

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

  /*
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setChooseForm({
      ...chooseForm,
      [name]: value,
    });
  };
  */

  const handleBooleanChange = (event) => {
    const { name, value } = event.target;
    let real_value = false;
    switch (value) {
      case "true":
        real_value = true;
        break;
      case "false":
        real_value = false;
        break;
      default:
        real_value = false;
    }
    setChooseForm({
      ...chooseForm,
      [name]: real_value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (chooseForm.chosen) {
      const chooseResponse = await choose_a_match({
        variables: {
          PotentialMatchId: match_id,
        },
      });
      console.log(chooseResponse);
    }
    goHome();
  };

  return (
    <div>
      <p>Choose_one</p>
      <DisplayOneUser user={other_user} />

      <div className="container my-1">
        <form onSubmit={handleSubmit}>
          <div className="flex-row space-between my-2">
            <label htmlFor="choose_one">
              Do you choose this one?
              <select name="chosen" id="chosen" onChange={handleBooleanChange}>
                <option value={false}>no</option>
                <option value={true}>yes</option>
              </select>
            </label>
          </div>

          <div className="flex-row flex-end">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
