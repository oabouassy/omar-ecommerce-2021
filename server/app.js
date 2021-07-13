require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const auth = require("./routes/auth");
const adminDashboard = require("./routes/admin");
const products = require("./routes/products");
const customerDashboard = require("./routes/customer");
const comment = require("./routes/comment");
const stripeRouter = require("./routes/stripe");

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// routes
app.use("/api/auth", auth);
app.use("/api/admin", adminDashboard);
app.use("/api/products", products);
app.use("/api/customer", customerDashboard);
app.use("/api/comment", comment);
app.use("/api/stripe", cors(), stripeRouter);

app.listen(PORT, () => {
  console.log(`Server is up on ${PORT}`);
});
