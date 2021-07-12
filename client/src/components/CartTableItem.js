import { useState, useContext } from "react";
import { Button, ButtonGroup, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import cartContext from "../context/CartContext";
import DeleteIcon from "@material-ui/icons/Delete";
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
  price,
  setTotalPrice,
}) => {
  const [cartItems, setCartItems] = useContext(cartContext);
  const [isDeleted, setIsDeleted] = useState(false);
  const [changedAmount, setChangedAmount] = useState(amount);
  const calcualteItemPrice = () => {
    return +price * +changedAmount;
  };
  function createData(id, name, category, changedAmount) {
    return {
      id,
      name,
      category,
      amount: changedAmount,
      price: calcualteItemPrice(),
    };
  }
  let row = createData(id, name, category, changedAmount);
  const reduceAmount = () => {
    if (changedAmount <= 1) {
      deleteAction();
      return;
    }
    setChangedAmount(changedAmount - 1);
    for (let obj of cartItems) {
      if (obj.product_name === name) {
        --obj.product_amount;
        console.log("CART AFTER ( - ) ", cartItems);
        return;
      }
    }
  };
  const increaseAmount = () => {
    setChangedAmount(changedAmount + 1);
    for (let obj of cartItems) {
      if (obj.product_name === name) {
        ++obj.product_amount;
        console.log("CART AFTER ( + ) ", cartItems);
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
  const deleteAction = () => {
    const newCartItems = cartItems.filter((item) => item.product_id !== row.id);
    setCartItems(newCartItems);
    setIsDeleted(true);
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
          <StyledTableCell align="right">{row.price} $</StyledTableCell>
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
