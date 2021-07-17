import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import DeleteCustomer from "./DeleteCustomer";
import UnblockCustomer from "./UnblockCustomer";
import BlockCustomer from "./BlockCustomer";
import userContext from "../context/userContext";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
  root: {
    marginTop: "2rem",
  },
  working: {
    color: "green",
  },
  strong: {
    display: "block",
    width: "50%",
    margin: "auto",
    padding: "0.3rem",
    marginTop: "0.5rem",
    borderRadius: "5px",
    textAlign: "center",
    color: "white",
    background: "green",
  },
  blocked: {
    color: "red",
  },
});

export default function CustomPaginationActionsTable() {
  const classes = useStyles2();
  const [userInfo] = useContext(userContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    fetchAllCustomers();
  }, []);
  const fetchAllCustomers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/customer", {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      if (!data.error) {
        setCustomers(data.customers);
      }
    } catch (error) {
      console.error("ERROR While Fetching customers data", error.message);
    }
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, customers.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper} className={classes.root}>
        <Table className={classes.table} aria-label="customer's data">
          <thead>
            <TableRow>
              <TableCell component="th" scope="row">
                <strong>Account id</strong>
              </TableCell>
              <TableCell component="th" scope="row">
                <strong>First Name</strong>
              </TableCell>
              <TableCell component="th" scope="row">
                <strong>Last Name</strong>
              </TableCell>
              <TableCell component="th" scope="row">
                <strong>Email</strong>
              </TableCell>
              <TableCell component="th" scope="row">
                <strong>Account Type</strong>
              </TableCell>
              <TableCell component="th" scope="row">
                <strong>Account Status</strong>
              </TableCell>
              <TableCell component="th" scope="row">
                <strong>Created at</strong>
              </TableCell>
              <TableCell component="th" scope="row">
                <strong>Delete Customer</strong>
              </TableCell>
            </TableRow>
          </thead>
          <TableBody>
            {(rowsPerPage > 0
              ? customers.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : customers
            ).map((customer) => (
              <TableRow key={customer.customer_id}>
                <TableCell component="th" scope="row">
                  {customer.customer_id}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {customer.customer_firstname}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {customer.customer_lastname}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {customer.customer_email}
                  {customer.customer_email === userInfo.customer_email ? (
                    <strong className={classes.strong}>your account</strong>
                  ) : null}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {customer.customer_isadmin ? "admin" : "customer"}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {customer.customer_isblocked ? (
                    <span className={classes.blocked}>Blocked</span>
                  ) : (
                    <span className={classes.working}>Working</span>
                  )}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {customer.customer_createdat}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  <DeleteCustomer
                    setCustomers={setCustomers}
                    customers={customers}
                    id={customer.customer_id}
                  />
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {customer.customer_isblocked ? (
                    <UnblockCustomer
                      setCustomers={setCustomers}
                      customers={customers}
                      id={customer.customer_id}
                    />
                  ) : (
                    <BlockCustomer
                      setCustomers={setCustomers}
                      customers={customers}
                      id={customer.customer_id}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={customers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
