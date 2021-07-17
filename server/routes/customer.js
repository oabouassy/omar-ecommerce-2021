const router = require("express").Router();
const authorize = require("../middleware/authorize");
const {
  getAllCustomers,
  getUserInfo,
  deleteCustomer,
  blockCustomer,
  unblockCustomer,
} = require("../controller/customerController");

router.get("/", authorize, getAllCustomers);

// GET A SPECIFIC CUSTOMER INFORMATION -> display it in 'my account' page
router.get("/:id", getUserInfo);

router.delete("/delete/:id", authorize, deleteCustomer);

router.put("/block/:id", authorize, blockCustomer);

router.put("/unblock/:id", authorize, unblockCustomer);

module.exports = router;
