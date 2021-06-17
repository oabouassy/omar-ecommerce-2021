const getAllCustomers = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM customer");
    res.json({ result: result.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Internal server error!");
  }
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

const getBlockedCustomers = async (req, res) => {
  try {
    const result = await db.query(
      "DELETE FROM customer WHERE customer_isBlocked = $1 RETURNING *",
      [true]
    );
    res.json({ deleted: result.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Internal server error!");
  }
};

const blockCustomer = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query(
      "UPDATE customer SET customer_isBlocked = $1 WHERE customer_id = $2 RETURNING *",
      [true, id]
    );
    res.json({ blocked: result.rows[0] });
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Internal server error!");
  }
};

const unblockCustomer = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query(
      "UPDATE customer SET customer_isBlocked = $1 WHERE customer_id = $2 RETURNING *",
      [false, id]
    );
    res.json({ unblocked: result.rows[0] });
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Internal server error!");
  }
};

module.exports = {
  getAllCustomers,
  deleteCustomer,
  getBlockedCustomers,
  blockCustomer,
  unblockCustomer,
};
