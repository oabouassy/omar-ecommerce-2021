const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    return res
      .status(403)
      .json({ error: true, msg: "Your are NOT authorized!" });
  }
  try {
    const { user } = jwt.verify(token, process.env.jwt_secret);
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({ error: true, msg: "Invalid token!" });
  }
};
