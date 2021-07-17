import { useState } from "react";
import { Container, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "8rem",
  },
  form: {
    // maxWidth: "70%",
  },
  inputWrapper: {
    "& > input": {},
    "& > textarea": {
      resize: "none",
    },
  },
}));

const ProductForm = () => {
  const classes = useStyles();
  /* name, details, category, review */
  const [data, setData] = useState({
    name: "",
    details: "",
    category: "",
    review: "",
    price: "",
    image: "",
  });
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);
  const { name, details, category, review, price } = data;
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("details", data.details);
    formData.append("category", data.category);
    formData.append("review", +data.review);
    formData.append("image", data.image);
    formData.append("price", +data.price);
    try {
      const res = await fetch("http://localhost:5000/api/products/add", {
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
        },
        body: formData,
      });
      const dataFromServer = await res.json();
      setLoading(false);
      if (dataFromServer.added) {
        setAdded(true);
        setTimeout(() => setLoading(true), 2000);
      } else {
        setAdded(false);
        setTimeout(() => setLoading(true), 2000);
      }
    } catch (error) {
      console.error("ProductForm uploading Error!!", error.message);
    }
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleChangeImage = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.files[0] });
  };
  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        {added & !loading ? (
          <Alert severity="success">
            This is a success alert — check it out!
          </Alert>
        ) : null}
        {!added && !loading ? (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            This is an error alert — <strong>check it out!</strong>
          </Alert>
        ) : null}
        <form onSubmit={handleSubmit} className={classes.form}>
          <Typography variant="h4">All new Product</Typography>
          <div className={classes.inputWrapper}>
            <input
              type="text"
              name="name"
              placeholder="product name"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className={classes.inputWrapper}>
            <textarea
              name="details"
              cols="30"
              rows="10"
              placeholder="product details"
              value={details}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className={classes.inputWrapper}>
            <input
              type="text"
              name="category"
              placeholder="product category"
              value={category}
              onChange={handleChange}
            />
          </div>
          <div className={classes.inputWrapper}>
            <input
              type="text"
              name="review"
              placeholder="product review 1 - 10"
              value={review}
              onChange={handleChange}
            />
          </div>
          <div className={classes.inputWrapper}>
            <input
              type="text"
              name="price"
              placeholder="product price"
              value={price}
              onChange={handleChange}
            />
          </div>
          <div className={classes.inputWrapper}>
            <input type="file" name="image" onChange={handleChangeImage} />
          </div>
          <div className={classes.inputWrapper}>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default ProductForm;
