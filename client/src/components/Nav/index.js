import { React } from "react";
import Auth from "../../utils/auth.js";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries.js";

import cupid from "../../assets/cupid_shooting_arrow.png";

function Nav() {
  const { loading, error, data } = useQuery(QUERY_USER);

  function showNavigation() {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      console.log(error);
      return <p>error</p>;
    }
    if (!data) {
      return <p>No data</p>;
    }

    if (Auth.loggedIn() && data.user) {
      const user = data.user;

      return (
        <>
          <h1>{user.username}</h1>
          <ul className="flex-row">
            {user.matchmaker ? (
              <li className="mx-1">
                <Link to="/rate_list">Rate</Link>
              </li>
            ) : (
              <>
                <li className="mx-1">
                  <Link to="/profile">Profile</Link>
                </li>
                <li className="mx-1">
                  <Link to="/wishlist">Wish List</Link>
                </li>
                {!user.paid ? (
                  <li className="mx-1">
                    <Link to="/pay">Pay</Link>
                  </li>
                ) : (
                  <div></div>
                )}
                {user.profile_specified &&
                user.wishlist_specified &&
                user.paid ? (
                  <li className="mx-1">
                    <Link to="/choose_list">Choose</Link>
                  </li>
                ) : (
                  <div></div>
                )}
              </>
            )}

            {/* Logged in users can always log out.  */}
            <li className="mx-1">
              {/* this is not using the Link component to
               * logout or user and then refresh the application
               * to the start */}
              <a href="/" onClick={() => Auth.logout()}>
                Logout
              </a>
            </li>
          </ul>
        </>
      );
    } else {
      /* If we are not logged in, we can only log in or sign up.
       */
      return (
        <>
          <h1>Matchmaker</h1>
          <ul className="flex-row">
            <li className="mx-1">
              <Link to="/signup">Signup</Link>
            </li>
            <li className="mx-1">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          <img
            src={cupid}
            aria-label="go home"
            alt="Cupid with arrow"
            width="100"
          />
        </Link>
      </h1>

      <nav>{showNavigation()}</nav>
    </header>
  );
}

export default Nav;
