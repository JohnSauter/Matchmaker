const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

let jwt_secret = process.env.JWT_SECRET;
if (!jwt_secret) {
  /* We do not have an environment variable with a secret
   * so make one up.  Doing this means that restarting
   * the server causes previous logins to become invalid.
   */
  jwt_secret = uuidv4();
  console.log("jwt secret is: " + String(jwt_secret));
}

/* Tokens are only valid for two hours.  After than
 * users must log in again.  */
const expiration = "2h";

module.exports = {
  authMiddleware: function ({ req }) {
    // Allows token to be sent via req.body, req.query, or headers.
    let token = req.body.token || req.query.token || req.headers.authorization;

    // Authorization is formatted as "Bearer <tokenvalue>"."
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      /* We have no token, so pass along the request unchanged.
       */
      return req;
    }

    /* Include the data from the token in the request under "user".
     */
    try {
      const { data } = jwt.verify(token, jwt_secret, { maxAge: expiration });
      req.user = data;
    } catch (err) {
      /* If jwt.verify fails to verify the token it throws an error message.
       */
      console.log("Invalid token:");
      if (err.message) {
        console.log(err.message);
      }
    }

    /* Pass along the (possibly updated) request.  */
    return req;
  },

  /* Create a signed token containing the user id.  */
  signToken: function ({ _id }) {
    const payload = { _id };
    return jwt.sign({ data: payload }, jwt_secret, { expiresIn: expiration });
  },
};
