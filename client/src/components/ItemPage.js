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

import { Link } from "react-router-dom";
import ProductComments from "./ProductComments";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "8rem",
  },
  header: {
    textAlign: "center",
    paddingBottom: "1rem",
  },
  media: {
    display: "block",
    maxWidth: "25rem",
    margin: "auto",
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
}));

const ItemPage = (props) => {
  const classes = useStyles();
  const productID = props.match.params.productID;
  const [product, setProduct] = useState({});
  const [cartItems, setCartItems] = useContext(cartContext);
  const [cartTotalPrice, setCartTotalPrice] = useContext(cartTotalPriceContext);
  const [userInfo] = useContext(userContext);
  const [deleted, setDeleted] = useState(false);
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
  };
  const deleteProduct = async (e) => {
    e.preventDefault();
    const id = product.product_id;
    const res = await fetch(`http://localhost:5000/api/products/delete/${id}`, {
      method: "DELETE",
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    if (data.deleted) {
      setDeleted(true);
    }
  };
  return (
    <Container maxWidth="lg" className={classes.root}>
      {product.product_id ? (
        <div>
          <Grid container>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  {/* Container for: title & image */}
                  <div className={classes.fContainer}>
                    <Grid container spacing={2}>
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
                  </div>
                </Grid>

                <Grid item xs={12} md={6}>
                  {/* Container for: price & Description */}
                  <div className={classes.sContainer}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="h6">
                          {product.product_price} $
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body1">
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

                        <Link to="/customer/cart" className={classes.link}>
                          go to my cart
                        </Link>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={deleteProduct}
                        >
                          Delete This Product
                        </Button>
                        {deleted ? (
                          <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            Your product has been deleted succesfully —{" "}
                            <strong>refresh the page!</strong>
                          </Alert>
                        ) : null}
                      </Grid>
                      {/* <Grid item></Grid> */}
                    </Grid>
                  </div>
                </Grid>
                {/* Container for Add to Card */}
              </Grid>
            </Grid>
          </Grid>
          <ProductComments productId={product.product_id} />
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
