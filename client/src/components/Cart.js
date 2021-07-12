import { useContext } from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import UserContext from "../context/userContext";
import CartContext from "../context/CartContext";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "8rem",
  },
}));

const Cart = () => {
  const classes = useStyles();
  const [userInfo] = useContext(UserContext);
  const [cartItems, setCartItems] = useContext(CartContext);
  const fill = () => {
    setCartItems(["Football", "T-shirt", "Boxer"]);
  };
  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h4">My Cart</Typography>;
      <ul>
        {cartItems.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
      <button onClick={fill}>Fill</button>
    </Container>
  );
};

export default Cart;
