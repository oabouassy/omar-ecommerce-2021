import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { MyDrawer } from "./Drawer";
import { makeStyles } from "@material-ui/core/styles";
import userContext from "../context/userContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  btnLink: {
    color: "inherit",
    textDecoration: "none",
    // "&:hover": {
    //   textDecoration: "underline",
    // },
  },
}));
//
const Navbar = () => {
  const classes = useStyles();
  const [userInfo] = useContext(userContext);
  // DRAWER
  const [drawer, setDrawer] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawer(open);
  };
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            Omar Abouassy
          </Typography>
          <Link to="/auth/login" className={classes.btnLink}>
            {userInfo.customer_email ? (
              <Button color="inherit">Sign Out</Button>
            ) : (
              <Button color="inherit">Login</Button>
            )}
          </Link>
        </Toolbar>
      </AppBar>
      <MyDrawer toggleDrawer={toggleDrawer} drawer={drawer} />
    </div>
  );
};

export default Navbar;
