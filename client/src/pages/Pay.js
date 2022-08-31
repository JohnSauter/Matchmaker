/* Pay.js */
/* Give us money.  */
import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
//import { useAppContext } from "../utils/GlobalState.js";
import { useParams } from "react-router-dom";

import { PAY } from "../utils/mutations";

// stripePromise returns a promise with the stripe object as soon as the Stripe package loads
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export function Pay() {
  //const [state, dispatch] = useAppContext();
  const [pay, pay_result] = useMutation(PAY, {
    refetchQueries: [{ query: QUERY_USER }],
  });
  const user_result = useQuery(QUERY_USER);

  /* If credit card authorization fails, we get back to this page
   * but with a parameter describing the problem.  */
  const { condition } = useParams();
  console.log(condition);

  /* When we get data back from setting up the credit card payment,
   * Send the user to a page where he enters his information.  */
  useEffect(() => {
    if (pay_result.data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: pay_result.data.pay });
      });
    }
  }, [pay_result.data]);

  if (user_result.loading) {
    return <p>Loading...</p>;
  }

  const user = user_result.data.user;

  /* When the user says he is ready to pay, set up the credit
   * card processing software, called Stripe.  */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const payResponse = await pay();
    console.log(payResponse);
  };

  /* Solicit a payment from the user, and mention if his
   * previous attempt failed.  */
  return (
    <>
      {user_result.loading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>Time to pay, {user.username}</h1>
          {!condition ? <div></div> : <p>condition</p>}
          <label>Pay to receive a list of potential matches.</label>
          <button type="submit">Click to pay</button>
        </form>
      )}
    </>
  );
}
