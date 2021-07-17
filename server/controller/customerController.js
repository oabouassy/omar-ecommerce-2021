const db = require("../db");
const getAllCustomers = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM customer");
    res.json({ customers: result.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error!" });
  }
};

const getUserInfo = async (req, res) => {
  //
};

const deleteCustomer = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query(
      "DELETE FROM customer WHERE customer_id = $1 RETURNING *",
      [id]
    );
    const deletedCustomer = await result.rows[0];
    res.json({ deleted: true, deletedCustomer });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Internal server error!");
  }
};

const blockCustomer = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query(
      "UPDATE customer SET customer_isblocked = $1 WHERE customer_id = $2 RETURNING *",
      [true, id]
    );
    res.json({ blocked: result.rows[0], error: false });
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Internal server error!");
  }
};

const unblockCustomer = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query(
      "UPDATE customer SET customer_isblocked = $1 WHERE customer_id = $2 RETURNING *",
      [false, id]
    );
    res.json({ unblocked: result.rows[0], error: false });
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Internal server error!");
  }
};

module.exports = {
  getAllCustomers,
  getUserInfo,
  deleteCustomer,
  blockCustomer,
  unblockCustomer,
};
