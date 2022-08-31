/* Chosen.js */
/* Present the chosen match with its contact information.  */

//import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

//import { useAppContext } from "../utils/GlobalState";
import {} from "../utils/actions";
import {} from "../utils/queries";
import { REJECT_MATCH } from "../utils/mutations";
import { QUERY_USER } from "../utils/queries";
//import { idbPromise } from "../utils/helpers";
//import spinner from "../assets/spinner.gif";

export function Chosen() {
  //const [state, dispatch] = useStoreContext();
  const [reject_match] = useMutation(REJECT_MATCH, {
    refetchQueries: [{ query: QUERY_USER }],
  });
  const { loading, error, data } = useQuery(QUERY_USER);
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

  const user = data.user.found_match;
  if (!user) {
    return <p>No user.</p>;
  }

  function DisplayOneUser(props) {
    const user = props.user;
    return (
      <ul>
        <li>Name: {user.username}</li>
        <li>gender: {user.gender}</li>
        <li>age: {user.age}</li>
        <li>height: {user.height}</li>
        <li>weight: {user.weight}</li>
        <li>eyes: {user.eyes}</li>
        <li>hair: {user.hair}</li>
        <li>About: {user.aboutMe}</li>
        <li>Contact information: {user.contactInfo}</li>
      </ul>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const rejectResponse = await reject_match();
    console.log(rejectResponse);
    goHome();
  };

  return (
    <div>
      <h2>Here is the person you have been matched with.</h2>
      <DisplayOneUser user={user} />

      <div className="container my-1">
        <form onSubmit={handleSubmit}>
          <div className="flex-row flex-end">
            <button type="submit">Reject</button>
          </div>
        </form>
      </div>
    </div>
  );
}
