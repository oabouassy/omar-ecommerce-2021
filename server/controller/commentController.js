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
module.exports = {
  addComment,
};
