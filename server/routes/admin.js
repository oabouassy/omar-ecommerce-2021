const router = require("express").Router();
const authorize = require("../middleware/authorize");
const { addAdmin } = require("../controller/adminController");

router.put("/add/:id", authorize, addAdmin);

module.exports = router;
