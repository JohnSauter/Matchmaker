/* Pay.js */
/* Give us money.  */
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { useLazyQuery } from '@apollo/client';
import { } from "../utils/queries";
import { } from "../utils/actions";
import { } from "../utils/queries";
import { PAY } from "../utils/mutations";

// stripePromise returns a promise with the stripe object as soon as the Stripe package loads
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');



// We check to see if there is a data object that exists, if so this means that a checkout session was returned from the backend
// Then we should redirect to the checkout with a reference to our session id
useEffect(() => {
  if (data) {
    stripePromise.then((res) => {
      res.redirectToCheckout({ sessionId: data.checkout.session });
    });
  }
}, [data]);


export function Pay() {

  const [state, dispatch] = useAppContext();
  const [Pay, pay_result] = useMutation(PAY, {
    refetchQueries: [{ query: QUERY_USER }],
  });
  const user_result = useQuery(QUERY_USER);
  const [payForm, setPayForm] = useState({
    card_number: "",
  });

  if (user_result.loading) {
    return <p>Loading...</p>;
  }
  const user = user_result.data.user;
  useEffect(() => {
    if (pay_result.data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: pay_result.data.checkout.session });
      });
    }
  }, [pay_result.data]);
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
