import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
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
  let history = useHistory();

  const onChange = (e) => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      console.log("Email or password can't be empty !");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInfo),
      });
      const data = await res.json();
      const { token, user, error } = data;
      if (user.customer_id) {
        // if he is blocked => alert("you are blocked")
        if (user.customer_isblocked) {
          console.log("Sorry, Your account has been suspended!");
          return;
        }
        // if he is an admin => alert ("done") + redirect to dash.
        if (user.customer_isadmin) {
          console.log("Welcome boss! redirecting you to the dashboard ...");
          setUserInfo(user);
          localStorage.setItem("token", token);
          return;
        } else {
          // if he is a regular user => alert("done") + redirect to home.
          console.log(
            "Happy to see you again, redirecting you to the home page ..."
          );
          setUserInfo(user);
          localStorage.setItem("token", token);
          return;
        }
      }
      if (error) {
        console.log("Please check your email and password !");
      }
    } catch (error) {
      console.log("ERROR while signing in, check Login.js");
      console.log(error.message);
    }
  };
  // fake@user.com
  // omaradmin22
  const signOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setUserInfo({});
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
