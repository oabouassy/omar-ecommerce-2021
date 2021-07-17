import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CustomerList from "./CustomerList";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "6rem",
  },
}));
const ManageCustomers = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h4">Manage Your Customers</Typography>
      <CustomerList />
    </Container>
  );
};

export default ManageCustomers;
