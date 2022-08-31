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
  /*
  const [payForm, setPayForm] = useState({
    card_number: "",
  });
  */

  const { condition } = useParams();
  console.log(condition);

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

  /*
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setPayForm({
      ...payForm,
      [name]: value,
    });
  };
  */

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payResponse = await pay();
    console.log(payResponse);
    //const stripe_session_id = payResponse.pay.ID;
  };

  return (
    <>
      {user_result.loading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>Time to pay, {user.username}</h1>
          {!condition ? (<div></div>) : <p>condition</p>}
          <label>Pay to receive a list of potential matches.</label>
          <button type="submit">Click to pay</button>
        </form>
      )}
    </>
  );
}
