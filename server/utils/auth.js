const jwt = require("jsonwebtoken");

const secret = "mysecretsshhhhh";
const expiration = "12h";

function getUserFromToken(token) {
  if (!token) {
    throw new Error("The Force is not strong with this one. No token found!");
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    return data;
  } catch (err) {
    console.log("Failed, this token has. Invalid, it is.", err);
    throw new Error("The Dark Side clouds this token!");
  }
}

module.exports = {
  contextMiddleware: ({ req }) => {
    let user = null; // default user to null
    try {
      const token = req.headers.authorization?.split(" ").pop().trim() || "";
      user = getUserFromToken(token);
    } catch (error) {
      console.log(
        "Disturbance in the Force, there is. Error extracting the user:",
        error.message
      );
    }
    return { user };
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
