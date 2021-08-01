const router = require("express").Router();
const authorize = require("../middleware/authorize");
const { addAdmin, demoteAdmin } = require("../controller/adminController");

router.put("/add/:id", authorize, addAdmin);
router.put("/demote/:id", authorize, demoteAdmin);

module.exports = router;
