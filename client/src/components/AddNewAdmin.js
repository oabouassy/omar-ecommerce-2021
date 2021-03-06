import React, { useState } from "react";
import {
  makeStyles,
  Container,
  Button,
  Typography,
  Paper,
  Grid,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "10rem",
  },
  form: {
    width: "auto",
    paddingLeft: "40px",
    paddingRight: "40px",
  },
  paper: {
    width: "auto",
    maxWidth: "30rem",
    margin: "auto",
  },
  header: {
    marginBottom: "2rem",
    padding: "1rem",
    borderLeft: "6px solid #313f8c",
  },
}));

const AddNewAdmin = () => {
  const [email, setEmail] = useState("");
  const classes = useStyles();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const ErrorOptions = {
      closeButton: true,
      type: toast.TYPE.ERROR,
      autoClose: 2000,
    };
    if (email === "") {
      toast("User email is empty!", ErrorOptions);
      return;
    }
    const res = await fetch(`http://localhost:5000/api/admin/add/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    if (data.updated) {
      const SuccessOptions = {
        closeButton: true,
        type: toast.TYPE.SUCCESS,
        autoClose: 2000,
      };
      toast("This user is an admin now!", SuccessOptions);
    } else {
      toast("Error, Make sure it's a correct email", ErrorOptions);
    }
  };
  return (
    <Container maxWidth="lg" className={classes.root}>
      <ToastContainer draggable />
      <Paper elevation={3} className={classes.paper}>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          className={classes.form}
        >
          <Typography variant="h4" className={classes.header}>
            Add New Admin
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="standard-basic"
                label="user email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} style={{ margin: "auto" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{ display: "block", width: "100%" }}
              >
                Modify Now
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddNewAdmin;
