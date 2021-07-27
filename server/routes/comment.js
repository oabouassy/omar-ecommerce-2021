const router = require("express").Router();
const authorize = require("../middleware/authorize");
const {
  addComment,
  getProductComments,
} = require("../controller/commentController");

// ( add ) POST : comment on a specific product
router.post("/add", authorize, addComment);

router.get("/all", getProductComments);

// ( remove ) DELETE : his account => WILL BE ADDED SOON !

module.exports = router;
