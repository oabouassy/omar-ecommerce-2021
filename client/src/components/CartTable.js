import { useContext } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import cartContext from "../context/CartContext";
import CartTableItem from "./CartTableItem";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

// COMPONENT
const CartTable = ({ setTotalPrice }) => {
  const classes = useStyles();
  const [cartItems, setCartItems] = useContext(cartContext);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>id</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((i) => (
            <CartTableItem
              key={i.product_id}
              id={i.product_id}
              name={i.product_name}
              category={i.product_category}
              amount={i.product_amount}
              price={i.product_price}
              setTotalPrice={setTotalPrice}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartTable;
