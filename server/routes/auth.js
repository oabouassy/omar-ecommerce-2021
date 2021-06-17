const router = require("express").Router();
const authorize = require("../middleware/authorize");
const { signUp, signIn, verify } = require("../controller/authController");

router.post("/signup", signUp);

router.post("/login", signIn);

router.post("/verify", authorize, verify);

module.exports = router;
