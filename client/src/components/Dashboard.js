import React from "react";
import { makeStyles, Container } from "@material-ui/core";
import AddNewProduct from "./AddNewProduct";
import GetAllCustomersAccordion from "./GetAllCustomersAccordion";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "5rem",
  },
  content: {
    //
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        {/* ADD NEW PRODUCT */}
        <AddNewProduct />
        {/* SHOW ALL CUSTOMERS */}
        <GetAllCustomersAccordion />
      </Container>
    </div>
  );
};

export default Dashboard;
