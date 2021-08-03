import React from "react";
import { Typography, makeStyles, Container } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "50vh",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "35rem",
  },
}));

const NotFound = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h3">That page doesn't exist!</Typography>
    </Container>
  );
};

export default NotFound;
