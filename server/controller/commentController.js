const db = require("../db");

const addComment = async (req, res) => {
  const { comment_details, customer_id, product_id } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO comment (comment_details, customer_id, product_id) VALUES ($1, $2, $3) RETURNING *",
      [comment_details, customer_id, product_id]
    );
    res.json({ comment: result.rows[0] });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Internal server error!");
  }
};
const getProductComments = async (req, res) => {
  const { product_id } = req.query;
  try {
    const results = await db.query(
      "SELECT cu.customer_firstname, cu.customer_lastname, co.comment_id, co.comment_details FROM customer cu INNER JOIN comment co USING(customer_id) WHERE co.product_id = $1",
      [product_id]
    );
    res.json({ comments: results.rows });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Internal server error!");
  }
  /**
  SELECT comment_id, comment_details, customer.customer_firstname, customer.customer_lastname, product.product_id, product.product_name
  FROM comment
  INNER JOIN customer USING(customer_id)
  INNER JOIN product USING(product_id)
   */
};
module.exports = {
  addComment,
  getProductComments,
};
