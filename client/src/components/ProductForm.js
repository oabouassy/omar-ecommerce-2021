import { useState } from "react";
import { Container, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10rem",
    padding: "1rem",
  },
  header: {
    marginBottom: "2rem",
    padding: "1rem",
    borderLeft: "6px solid #313f8c",
  },
  form: {
    fontFamily: "Roboto",
    width: "auto",
    paddingLeft: "40px",
    paddingRight: "40px",
  },
  paper: {
    width: "auto",
    maxWidth: "30rem",
    margin: "auto",
  },
  inputWrapper: {
    "& > textarea": {
      width: "100%",
      maxWidth: "100%",
      resize: "none",
      padding: "12px",
      fontFamily: "Roboto",
      fontSize: "1rem",
      border: "1px solid rgba(50, 50, 93, 0.1)",
      boxSizing: "border-box",
    },
    marginBottom: "1rem",
  },
  btn: {
    width: "100%",
    marginTop: "2rem",
  },
}));

const ProductForm = () => {
  const classes = useStyles();
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
    if (
      name === "" ||
      details === "" ||
      category === "" ||
      review === "" ||
      price === ""
    ) {
      setLoading(false);
      setAdded(false);
      setTimeout(() => setLoading(true), 2000);
      return;
    }
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
        <Paper elevation={3} className={classes.paper}>
          <form
            style={{ paddingLeft: "40px", paddingRight: "40px" }}
            onSubmit={handleSubmit}
            className={classes.form}
          >
            <Typography variant="h4" className={classes.header}>
              Add new product
            </Typography>
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
              <Button
                variant="contained"
                color="primary"
                className={classes.btn}
                onClick={handleSubmit}
              >
                Add now
              </Button>
            </div>
          </form>
          {added & !loading ? (
            <Alert severity="success" className={classes.alert}>
              <AlertTitle>Added</AlertTitle>
              Your product has been added succesfully — check it out!
            </Alert>
          ) : null}
          {!added && !loading ? (
            <Alert severity="error" className={classes.alert}>
              <AlertTitle>Error</AlertTitle>
              Sorry, an error occured — <strong>try again!</strong>
            </Alert>
          ) : null}
        </Paper>
      </div>
    </Container>
  );
};

export default ProductForm;
