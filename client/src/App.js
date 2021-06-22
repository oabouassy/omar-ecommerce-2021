import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Products from "./components/HomeProductSection";
import ProductCategory from "./components/LEGACY_CODE/ProductCategory";
import ItemPage from "./components/ItemPage";
import ProductsPage from "./components/ProductsPage";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import NotAllowedPage from "./components/NotAllowedPage";
import SignUp from "./components/SignUp";
import StickyFooter from "./components/StickyFooter";
import UserContext from "./context/userContext";
import Home from "./components/Home";

function App() {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    grabUserInfo();
  }, []);
  const grabUserInfo = async () => {
    const res = await fetch("http://localhost:5000/api/auth/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const { error, user } = await res.json();
    if (!error) {
      setUserInfo(user);
    }
  };
  return (
    <Router>
      <UserContext.Provider value={[userInfo, setUserInfo]}>
        <div>
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <Redirect to="/home" {...props} />}
            />

            {/* HOMEPAGE */}
            <Route exact path="/home" render={(props) => <Home {...props} />} />

            {/* SIGN IN */}
            <Route
              path="/auth/login"
              render={(props) => <Login {...props} />}
            />

            {/* SIGN UP */}
            <Route
              path="/auth/signup"
              render={(props) => <SignUp {...props} />}
            />

            {/* FETCH ALL ITEMS => REDIRECT TO PAGE 1 */}
            <Route
              exact
              path="/products"
              render={(props) => (
                <Redirect {...props} to="/products/p/:pageNumber" />
              )}
            />
            <Route
              exact
              path="/products/p/:pageNumber"
              render={(props) => <ProductsPage {...props} />}
            />

            {/* FETCH CATEGORY ITEMS  => REDIRECT TO PAGE 1*/}
            <Route
              exact
              path="/products/:category"
              render={(props) => (
                <Redirect to="/products/:category/p/:pageNumber" {...props} />
              )}
            />
            <Route
              exact
              path="/products/:category/p/:pageNumber"
              render={(props) => <ProductCategory {...props} />}
            />

            {/* FETCH A SPECIFIC ITEM */}
            <Route
              exact
              path="/product/id/:productID"
              render={(props) => <ItemPage {...props} />}
            />

            <Route
              path="/admin/dashboard"
              render={() =>
                !userInfo.customer_isadmin ? <Dashboard /> : <NotAllowedPage />
              }
              // REMOVE THE ! from the start of (userInfo.customer_isadmin)
            ></Route>

            {/* ABOUT PAGE */}
            <Route
              exact
              path="/about"
              render={(props) => <About {...props} />}
            />
          </Switch>
          <StickyFooter />
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
