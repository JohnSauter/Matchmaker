/* Signup.js */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

export function Signup(props) {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    matchmaker: false,
  });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addUser({
        variables: {
          username: formState.username,
          email: formState.email,
          password: formState.password,
          matchmaker: formState.matchmaker,
        },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    } catch (err) {
      console.log("signup error:");
      if (err.message) {
        console.log(err.message);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

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
    setFormState({
      ...formState,
      [name]: real_value,
    });
  };

  return (
    <div className="container my-1">
      <Link to="/login">← Go to Login</Link>

      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="username">Username:</label>
          <input
            placeholder="name"
            name="username"
            type="username"
            id="username"
            onChange={handleChange}
          />
        </div>

        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>

        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>

        <div className="flex-row space-between my-2">
          <label htmlFor="matchmaker">Matchmaker?</label>
          <select
            name="matchmaker"
            id="matchmaker"
            onChange={handleBooleanChange}
          >
            <option value={false}>no</option>
            <option value={true}>yes</option>
          </select>
        </div>

        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
