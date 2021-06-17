import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Alert, AlertTitle } from "@material-ui/lab";
import UserContext from "../context/userContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alerts: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    marginBottom: theme.spacing(3),
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default function Login() {
  const [userInfo, setUserInfo] = useContext(UserContext);
  const classes = useStyles();
  const [formInfo, setFormInfo] = useState({ email: "", password: "" });
  const { email, password } = formInfo;
  const [attemptLogin, setAttemptLogin] = useState(false);
  const [error, setError] = useState({ isError: false, msg: "" });

  const onChange = (e) => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInfo),
    });
    const data = await res.json();
    setAttemptLogin(true);
    setTimeout(() => setAttemptLogin(false), 3000);
    if (data.error) {
      setError({ isError: true, msg: data.msg });
    }
    if (data.token) {
      localStorage.setItem("token", data.token);
      setUserInfo(data.user);
      setError({ isError: false, msg: "" });
    }
  };
  const signOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setUserInfo({});
    console.log("signout");
  };
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <div className={classes.alerts}>
            {attemptLogin && error.isError ? (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error.msg} — <strong>try again!</strong>
              </Alert>
            ) : null}
            {attemptLogin && !error.isError ? (
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                You have been successfully logged in —{" "}
                <strong>nice to see you again!</strong>
              </Alert>
            ) : null}
          </div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            name="email"
            value={email}
            onChange={onChange}
            disabled={userInfo.customer_email ? true : false}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            name="password"
            value={password}
            onChange={onChange}
            disabled={userInfo.customer_email ? true : false}
          />
          {userInfo.customer_email ? (
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={signOut}
            >
              Sign Out
            </Button>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          )}
          <Grid container>
            <Grid item>
              <Link to="/auth/signup" className={classes.link} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
