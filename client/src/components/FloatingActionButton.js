import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      marginRight: theme.spacing(2),
      boxShadow: "none",
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function FloatingActionButton() {
  const classes = useStyles();

  return (
    <Link to="/customer/cart">
      <div className={classes.root}>
        <Fab color="primary" aria-label="Shopping Cart" size="medium">
          <ShoppingCartIcon />
        </Fab>
      </div>
    </Link>
  );
}
