const db = require("../db");

const addAdmin = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query(
      "UPDATE customer SET customer_isadmin = $1 WHERE customer_email = $2 RETURNING *",
      [true, id]
    );
    res.json({ updated: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Internal server error!");
  }
};

const demoteAdmin = async (req, res) => {
  const id = req.params.id;
  try {
    const exists = db.query(
      "SELECT * FROM customer WHERE customer_email = $1",
      [id]
    );
    if ((await exists).rows.length > 0) {
      const result = await db.query(
        "UPDATE customer SET customer_isadmin = $1 WHERE customer_email = $2 RETURNING *",
        [false, id]
      );
      res.json({ demoted: true });
    } else {
      res.json({ demoted: false, msg: "User does NOT exist!" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Internal server error!");
  }
};

module.exports = {
  addAdmin,
  demoteAdmin,
};
