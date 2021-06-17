import { useContext } from "react";
import { Drawer } from "@material-ui/core";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import StoreIcon from "@material-ui/icons/Store";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import InfoIcon from "@material-ui/icons/Info";
import AddIcon from "@material-ui/icons/Add";
import LockIcon from "@material-ui/icons/Lock";
import { Link } from "react-router-dom";
import userContext from "../context/userContext";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

export const MyDrawer = ({ drawer, toggleDrawer }) => {
  const [userInfo] = useContext(userContext);
  const classes = useStyles();
  const createListItem = (text, icon, url) => {
    return (
      <Link to={url} className={classes.link}>
        <ListItem button>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      </Link>
    );
  };
  return (
    <Drawer anchor="left" open={drawer} onClose={toggleDrawer(false)}>
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {createListItem("Home", <HomeIcon />, "/")}
          {createListItem("Products", <StoreIcon />, "/products")}
          {userInfo.customer_email
            ? createListItem(
                "My Account",
                <AccountCircleIcon />,
                "/user/account/dashboard"
              )
            : null}
          {userInfo.customer_isadmin
            ? createListItem(
                "Admin Dashboard",
                <SettingsIcon />,
                "/admin/dashboard"
              )
            : null}
          {createListItem("About", <InfoIcon />, "/about")}
        </List>
        <Divider />
        <List>
          {createListItem("Create an Account", <AddIcon />, "/auth/signup")}
          {userInfo.customer_email
            ? createListItem("Sign Out", <LockIcon />, "/auth/login")
            : createListItem("Sign In", <LockIcon />, "/auth/login")}
        </List>
      </div>
    </Drawer>
  );
};
