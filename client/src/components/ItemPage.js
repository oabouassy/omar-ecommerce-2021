import { useState, useEffect, useContext } from "react";
import {
  Typography,
  Container,
  makeStyles,
  Grid,
  Button,
} from "@material-ui/core";
import cartContext from "../context/CartContext";
import cartTotalPriceContext from "../context/cartTotalPrice";
import userContext from "../context/userContext";
import Tooltip from "@material-ui/core/Tooltip";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Link, useHistory } from "react-router-dom";
import ProductComments from "./ProductComments";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    marginTop: "9em",
  },
  header: {
    textAlign: "center",
    paddingBottom: "1rem",
    textTransform: "capitalize",
  },
  media: {
    display: "block",
    width: "30rem",
    maxWidth: "100%",
    margin: "auto",
    borderRadius: "3%",
  },
  button: {
    display: "block",
    marginTop: theme.spacing(2),
    width: "80%",
  },
  link: {
    display: "block",
    marginTop: theme.spacing(2),
    textDecoration: "none",
    width: "80%",
    "& > *": {
      width: "100%",
    },
  },
  fContainer: {
    marginBottom: "3rem",
  },
}));

const ItemPage = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const productID = props.match.params.productID;
  const [product, setProduct] = useState({});
  const [cartItems, setCartItems] = useContext(cartContext);
  const [cartTotalPrice, setCartTotalPrice] = useContext(cartTotalPriceContext);
  const [userInfo] = useContext(userContext);
  const mediumScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
  useEffect(() => {
    fetchProduct();
  }, []);
  const fetchProduct = async () => {
    const res = await fetch(
      `http://localhost:5000/api/products/single?id=${productID}`
    );
    const data = await res.json();
    if (data.product) {
      setProduct(data.product);
    }
  };
  const addMoreItem = () => {
    let existedAndIncremented = false;
    for (let item of cartItems) {
      if (item.id === product.product_id) {
        item.amountOfItems = item.amountOfItems + 1;
        setCartTotalPrice(cartTotalPrice + item.priceOfOne);
        existedAndIncremented = true;
      }
    }
    return existedAndIncremented;
  };
  // options for toastify
  const errorOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const successOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const addToCart = () => {
    // if this product is already existed in the cart, increment its amount
    const existedAndIncremented = addMoreItem();
    // else, Adding a product for the first time
    if (!existedAndIncremented) {
      let item = {
        id: product.product_id,
        name: product.product_name,
        category: product.product_category,
        amountOfItems: 1,
        priceOfOne: +product.product_price,
        priceOfAllItems: () => {
          return item.priceOfOne * item.amountOfItems;
        },
      };
      cartItems.push(item);
      setCartItems(cartItems);
      setCartTotalPrice(cartTotalPrice + item.priceOfOne);
    }
    // Notification
    toast.success("Added to your cart", successOptions);
  };
  const deleteProduct = async (e) => {
    e.preventDefault();
    const id = product.product_id;
    try {
      const res = await fetch(
        `http://localhost:5000/api/products/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      const data = await res.json();
      if (data.deleted) {
        toast.success(
          "Deleted succesfully ??? redirecting to home page...",
          successOptions
        );
        setTimeout(() => {
          history.push("/");
        }, 3000);
      } else {
        toast.error("Error ??? please try again.", errorOptions);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Container maxWidth="lg" className={classes.root}>
      {product.product_id ? (
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8} md={6}>
              {/* Container for: title & image */}
              <Grid container spacing={2} className={classes.fContainer}>
                <Grid item xs={12}>
                  <Typography variant="h3" className={classes.header}>
                    {product.product_name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <img
                    className={classes.media}
                    src={`http://localhost:5000${product.product_img_link}`}
                    alt={product.product_name}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4}>
              {/* Container for: price & Description */}
              <div className={classes.sContainer}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" style={{ textAlign: "left" }}>
                      {product.product_price} $
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      style={{ textAlign: "left", wordWrap: "break-word" }}
                    >
                      {product.product_details}
                    </Typography>
                    {userInfo.customer_id ? (
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={addToCart}
                        className={classes.button}
                      >
                        Add to Cart
                      </Button>
                    ) : (
                      <Tooltip
                        title="Sign in to add this product to your cart"
                        placement="top"
                      >
                        <Link to="/auth/login" className={classes.link}>
                          <Button color="secondary" variant="contained">
                            Sign in
                          </Button>
                        </Link>
                      </Tooltip>
                    )}
                    <ToastContainer draggable />
                    {userInfo.customer_id ? (
                      <Button
                        className={classes.button}
                        variant="outlined"
                        color="secondary"
                        onClick={deleteProduct}
                      >
                        Delete This Product
                      </Button>
                    ) : null}
                  </Grid>
                </Grid>
              </div>
            </Grid>
            {/* Container for Add to Card */}
          </Grid>
          <div style={{ marginTop: "3rem" }}>
            <ProductComments productId={product.product_id} />
          </div>
        </div>
      ) : (
        <Alert severity="info">
          <AlertTitle>Not Available</AlertTitle>
          This Product is NOT available right now !{" "}
          <strong>please, come back later!</strong>
        </Alert>
      )}
    </Container>
  );
};

export default ItemPage;
