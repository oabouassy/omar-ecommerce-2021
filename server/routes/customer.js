const router = require("express").Router();
const authorize = require("../middleware/authorize");
const {
  getAllCustomers,
  deleteCustomer,
  getBlockedCustomers,
  blockCustomer,
  unblockCustomer,
} = require("../controller/customerController");

router.get("/", authorize, getAllCustomers);

router.delete("/delete/:id", authorize, deleteCustomer);

router.get("/blockedCustomers", authorize, getBlockedCustomers);

router.put("/block/:id", authorize, blockCustomer);

router.put("/unblock/:id", authorize, unblockCustomer);

module.exports = router;
