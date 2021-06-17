const bcrypt = require("bcrypt");
const db = require("../db");
const genJWT = require("../utils/genJWT");

// SIGN UP
const signUp = async (req, res) => {
  /**
   * customer_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_firstname VARCHAR(225) NOT NULL,
  customer_lastname VARCHAR(225) NOT NULL,
  customer_email VARCHAR(225) NOT NULL UNIQUE,
  customer_password VARCHAR(225) NOT NULL ,
  customer_isadmin BOOLEAN NOT NULL,
  customer_isblocked BOOLEAN NOT NULL,
   */
  const { firstname, lastname, email, password, isblocked, isadmin } = req.body;
  try {
    const user = await db.query(
      "SELECT * FROM customer WHERE customer_email = $1",
      [email]
    );
    if (user.rows.length > 0) {
      return res
        .status(401)
        .json({ error: true, msg: "Email already exists!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.query(
      "INSERT INTO customer (customer_firstname, customer_lastname, customer_email, customer_password, customer_isblocked, customer_isadmin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [firstname, lastname, email, hashedPassword, isblocked, isadmin]
    );
    return res.json({
      error: false,
      msg: `Welcome, ${newUser.rows[0].customer_firstname}, your account has been created succesfully!`,
    });
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ error: true, msg: "Internal server error!" });
  }
};

// SIGN IN
const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.query(
      "SELECT * FROM customer WHERE customer_email = $1",
      [email]
    );
    if (user.rows.length === 0) {
      return res
        .status(401)
        .json({ error: true, msg: "Invalid email or password!" });
    }
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].customer_password
    );
    if (!validPassword) {
      return res
        .status(401)
        .json({ error: true, msg: "Invalid email or password!" });
    }
    const token = genJWT(user.rows[0].customer_id);
    return res.status(200).json({ error: false, token, user: user.rows[0] });
  } catch (error) {
    console.log(erro.message);
    res.status(500).json({ error: true, msg: "Internal server error!" });
  }
};

// VERIFY TOKEN
const verify = async (req, res) => {
  const id = req.user;
  const user = await db.query("SELECT * FROM customer WHERE customer_id = $1", [
    id,
  ]);
  res.json({ error: false, user: user.rows[0] });
};
module.exports = {
  signUp,
  signIn,
  verify,
};
