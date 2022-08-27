/* Pay.js */
/* Give us money.  */

import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import {} from "../utils/queries";
import {} from "../utils/actions";
import {} from "../utils/queries";
import { PAY } from "../utils/mutations";

export function Pay() {
  const [pay] = useMutation(PAY, {
    refetchQueries: [{ query: QUERY_USER }],
  });
  const { loading, data } = useQuery(QUERY_USER);
  const [payForm, setPayForm] = useState({
    card_number: "",
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  const user = data.user;

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setPayForm({
      ...payForm,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payResponse = await pay({
      variables: {
        card_number: payForm.card_number,
      },
    });
    console.log(payResponse);
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>Pay {user.username}</h1>

          <label>
            What is your credit card number?
            <input
              name="credit_card"
              type="text"
              value={payForm.card_number}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
}
