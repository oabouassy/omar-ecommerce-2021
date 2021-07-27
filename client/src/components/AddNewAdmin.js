import React, { useState } from "react";
import { makeStyles, Container, Button, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "6rem",
  },
  content: {
    //
  },
}));

const AddNewAdmin = () => {
  const [id, setId] = useState(0);
  const classes = useStyles();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const numId = id;
    const res = await fetch(`http://localhost:5000/api/admin/add/${numId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    if (data.updated) {
      console.log("he is ad admin now!");
    }
  };
  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h4">Add New Admin</Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="user id"
          onChange={(e) => setId(e.target.value)}
          value={id}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Modify Now
        </Button>
      </form>
    </Container>
  );
};

export default AddNewAdmin;
