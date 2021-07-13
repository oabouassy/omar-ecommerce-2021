import { useContext, useState } from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import UserContext from "../context/userContext";
import CartContext from "../context/CartContext";
import { useHistory, Link } from "react-router-dom";
import CartTable from "./CartTable";
import cartTotalPriceContext from "../context/cartTotalPrice";
import TotalPrice from "./TotalPrice";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "8rem",
  },
  link: {
    textDecoration: "none",
  },
}));

const Cart = () => {
  const history = useHistory();
  const classes = useStyles();
  const [userInfo] = useContext(UserContext);
  const [cartItems] = useContext(CartContext);

  const SignInFirst = () => {
    return (
      <>
        <Alert severity="warning">
          Please sign in first —{" "}
          <Link to="/auth/login" className={classes.link}>
            sign in!
          </Link>
        </Alert>
      </>
    );
  };

  const ShowCartComponent = () => {
    return (
      <>
        <Typography variant="h4">My Cart</Typography>;
        {cartItems.length === 0 ? (
          <Alert severity="info">
            Your cart is empty —{" "}
            <Link to="" className={classes.link}>
              Explore our products now!
            </Link>
          </Alert>
        ) : (
          <div>
            <CartTable />
            <TotalPrice />
          </div>
        )}
      </>
    );
  };
  return (
    <Container maxWidth="lg" className={classes.root}>
      {!userInfo.customer_id ? <SignInFirst /> : <ShowCartComponent />}
    </Container>
  );
};

export default Cart;
