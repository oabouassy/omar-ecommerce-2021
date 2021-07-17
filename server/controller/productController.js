const db = require("../db");
const fs = require("fs");

const addProduct = (req, res) => {
  const image = req.file;
  const extension = image.mimetype.split("/")[1];
  const { name, details, category, price, review } = req.body;
  fs.rename(
    `./public/imgs/${image.filename}`,
    `./public/imgs/${image.filename}.${extension}`,
    async () => {
      const img_link = `/imgs/${image.filename}.${extension}`;
      try {
        const result = await db.query(
          "INSERT INTO product (product_name, product_details, product_img_link, product_category, product_review, product_price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
          [name, details, img_link, category, +review, +price]
        );
        const product = result.rows[0];
        res.json({ added: true, product });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ added: false });
      }
    }
  );
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query(
      "DELETE FROM product WHERE product_id = $1 RETURNING *",
      [id]
    );
    const deletedProduct = await result.rows[0];
    res.json({ deleted: true, deletedProduct });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Internal server error!");
  }
};
const getAllProducts = async (req, res) => {
  const { page, limit } = req.query;
  let offset = (page - 1) * limit;
  try {
    // GET TOTAL NUMBER OF PRODUCTS
    const totalProducts = await db.query("SELECT count(*) from product");
    let total = totalProducts.rows[0].count;
    let totalPages = Math.ceil(total / limit);

    const result = await db.query(
      "SELECT * from product ORDER BY product_id OFFSET $1 LIMIT $2 ",
      [offset, limit]
    );
    res.json({ result: result.rows, page, totalPages });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Internal server error!");
  }
};

const getProductsByCategory = async (req, res) => {
  const { category, page, limit } = req.query;
  let offset = (+page - 1) * +limit;
  try {
    const totalProducts = await db.query(
      "SELECT COUNT(*) FROM product WHERE product_category = $1",
      [category]
    );
    let total = totalProducts.rows[0].count;
    // let totalPages = Math.ceil(total / limit);
    let totalPages = Math.ceil(total / +limit);
    const result = await db.query(
      "SELECT * from product WHERE product_category = $1 ORDER BY product_id LIMIT $2 OFFSET $3 ",
      [category, +limit, offset]
    );
    res.json({ result: result.rows, page, totalPages });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Internal server error!");
  }
};

const getAllCategories = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT DISTINCT product_category from product"
    );
    const totalCategories = result.rows.map((obj) => {
      return obj.product_category;
    });
    res.json({ categories: totalCategories });
  } catch (error) {
    console.log(error.message);
  }
};

const getProduct = async (req, res) => {
  const { id } = req.query;
  try {
    const result = await db.query(
      "SELECT * FROM product WHERE product_id = $1",
      [id]
    );
    res.json({ product: result.rows[0] });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Internal server error!");
  }
};
module.exports = {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductsByCategory,
  getAllCategories,
  getProduct,
};
