import React from "react";
import { makeStyles, Container, Paper } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "5rem",
  },
  listItem: {
    background: theme.palette.info.main,
    color: "black",
    marginBottom: "2rem",
    width: "100%",
    borderRadius: "10px",
    height: "5rem",
    textAlign: "center",
  },
  paper: {
    maxWidth: "35rem",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "10px",
  },
}));

// Helper component
function AddListItem({ url, text }) {
  const classes = useStyles();
  return (
    <Link to={url} style={{ textDecoration: "none", color: "inherit" }}>
      <Paper elevation={3} className={classes.paper}>
        <ListItem button className={classes.listItem}>
          <ListItemText primary={text} />
        </ListItem>
      </Paper>
    </Link>
  );
}

const Dashboard = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <List component="nav" aria-label="secondary mailbox folders">
          {/* ADD NEW PRODUCT */}
          <AddListItem
            url="/admin/dashboard/add-product"
            text="Add new product"
          />
          {/* Manage customers accounts */}
          <AddListItem
            url="/admin/dashboard/manage-customers"
            text="Manage your customers"
          />
          {/* Add new admin */}
          <AddListItem
            url="/admin/dashboard/promote-user"
            text="Add new admin"
          />
          {/* Demote an admin */}
          <AddListItem
            url="/admin/dashboard/demote-admin"
            text="Demote an admin"
          />
        </List>
      </Container>
    </div>
  );
};

export default Dashboard;
