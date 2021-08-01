import React from "react";
import { makeStyles, Container } from "@material-ui/core";
import AddNewProduct from "./AddNewProduct";
import GetAllCustomersAccordion from "./GetAllCustomersAccordion";
import PromoteUser from "./PromoteUser";
import DemoteAdmin from "./DemoteAdmin";

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
        {/* ADD NEW ADMIN */}
        <PromoteUser />
        {/* DEMOTE AN ADMIN */}
        <DemoteAdmin />
      </Container>
    </div>
  );
};

export default Dashboard;
