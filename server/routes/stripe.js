const router = require("express").Router();
const { charge } = require("../controller/stripeController");
const authorize = require("../middleware/authorize");

router.post("/charge", authorize, charge);

module.exports = router;
