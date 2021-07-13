import { useState, useContext } from "react";
import { Button, ButtonGroup, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import cartContext from "../context/CartContext";
import DeleteIcon from "@material-ui/icons/Delete";
import cartTotalPriceContext from "../context/cartTotalPrice";

// STYLING
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

// COMPONENT
const CartTableItem = ({
  id,
  name,
  category,
  amount,
  priceOfAllItems,
  priceOfOne,
}) => {
  const [cartItems, setCartItems] = useContext(cartContext);
  const [cartTotalPrice, setCartTotalPrice] = useContext(cartTotalPriceContext);
  const [isDeleted, setIsDeleted] = useState(false);
  const [changedAmount, setChangedAmount] = useState(amount);
  function createData(id, name, category, changedAmount) {
    return {
      id,
      name,
      category,
      amount: changedAmount,
      priceOfOne,
      totalPrice: priceOfAllItems(),
    };
  }
  let row = createData(id, name, category, changedAmount);
  // Reduce the product's amount
  const reduceAmount = () => {
    if (changedAmount === 1) {
      deleteAction();
      return;
    }
    setChangedAmount(changedAmount - 1);
    setCartTotalPrice(cartTotalPrice - priceOfOne);
    for (let item of cartItems) {
      if (item.name === name) {
        // reduce the amount
        --item.amountOfItems;
        return;
      }
    }
  };
  const deleteAction = () => {
    const newCartItems = cartItems.filter((item) => item.id !== row.id);
    setCartItems(newCartItems);
    setCartTotalPrice(cartTotalPrice - priceOfOne);
    setIsDeleted(true);
  };
  // increment the amount
  const increaseAmount = () => {
    setChangedAmount(changedAmount + 1);
    setCartTotalPrice(cartTotalPrice + priceOfOne);
    for (let item of cartItems) {
      if (item.id === row.id) {
        ++item.amountOfItems;
        return;
      }
    }
  };
  const amountRow = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div style={{ fontSize: 14 }}>{changedAmount}</div>
        </Grid>
        <Grid item xs={8}>
          <ButtonGroup>
            <Button aria-label="reduce" onClick={reduceAmount}>
              <RemoveIcon fontSize="small" />
            </Button>
            <Button aria-label="increase" onClick={increaseAmount}>
              <AddIcon fontSize="small" />
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  };
  return (
    <>
      {!isDeleted ? (
        <StyledTableRow>
          <StyledTableCell component="th" scope="row">
            {row.id}
          </StyledTableCell>
          <StyledTableCell align="right">{row.name}</StyledTableCell>
          <StyledTableCell align="right">{row.category}</StyledTableCell>
          <StyledTableCell align="right">{amountRow()}</StyledTableCell>
          <StyledTableCell align="right">{row.totalPrice} $</StyledTableCell>
          <StyledTableCell align="right">
            <Button
              variant="contained"
              color="secondary"
              onClick={deleteAction}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </StyledTableCell>
        </StyledTableRow>
      ) : null}
    </>
  );
};

export default CartTableItem;
