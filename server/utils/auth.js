const jwt = require("jsonwebtoken");

const secret = "mysecretsshhhhh";
const expiration = "2h";

function getUserFromToken(token) {
  if (!token) {
    throw new Error("You have no token!");
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    return data;
  } catch (err) {
    console.log("Invalid token", err);
    throw new Error("Invalid token!");
  }
}

module.exports = {
  contextMiddleware: ({ req }) => {
    const token = req.headers.authorization?.split(" ").pop().trim() || "";
    const user = getUserFromToken(token);
    return { user };
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
