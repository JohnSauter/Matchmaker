import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Nav from "./components/Nav";
import { AppProvider } from "./utils/GlobalState";

const { Login } = require("./pages/Login.js");
const { Signup } = require("./pages/Signup.js");
const { Profile } = require("./pages/Profile.js");
const { Wishlist } = require("./pages/Wishlist.js");
const { Pay } = require("./pages/Pay.js");
const { RateList } = require("./pages/Rate_list.js");
const { RateOne } = require("./pages/Rate_one.js");
const { ChooseList } = require("./pages/Choose_list.js");
const { ChooseOne } = require("./pages/Choose_one.js");
const { Chosen } = require("./pages/Chosen.js");
const { NoMatch } = require("./pages/NoMatch.js");


const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <AppProvider>
            <Nav />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/pay" element={<Pay />} />
              <Route path="/rate_list" element={<RateList />} />
              <Route path="/rate_one" element={<RateOne />} />
              <Route path="/choose_list" element={<ChooseList />} />
              <Route path="/choose_one" element={<ChooseOne />} />
              <Route path="/chosen" element={<Chosen />} />
              <Route path="*" element={<NoMatch />} />

            </Routes>
          </AppProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

/*
<Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/pay" element={<Pay />} />
              <Route path="/rate" element={<Rate />} />
              <Route path="/choose" element={<Choose />} />
              <Route path="/chosen" element={<Chosen />} />
              <Route path="*" element={<NoMatch />} />

              */