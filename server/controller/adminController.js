const db = require("../db");

const addAdmin = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query(
      "UPDATE customer SET customer_isadmin = $1 WHERE customer_id = $2 RETURNING *",
      [true, id]
    );
    res.json({ updated: true, result: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Internal server error!");
  }
};

module.exports = {
  addAdmin,
};
