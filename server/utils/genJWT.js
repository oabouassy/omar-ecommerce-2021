const jwt = require("jsonwebtoken");

module.exports = (id) => {
  const payload = {
    user: id,
  };
  return jwt.sign(payload, process.env.jwt_secret, { expiresIn: "1h" });
};
