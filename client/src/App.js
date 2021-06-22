import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
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
            <Route exact path="/home" render={(props) => <Home {...props} />} />
            <Route
              path="/auth/login"
              render={(props) => <Login {...props} />}
            />
            <Route
              path="/auth/signup"
              render={(props) => <SignUp {...props} />}
            />
            <Route
              exact
              path="/products"
              render={(props) => <Redirect {...props} to="/products/p/1" />}
            />
            <Route
              exact
              path="/products/p/:pageNumber"
              render={(props) => <ProductsPage {...props} />}
            />

            <Route
              exact
              path="/products/:category"
              render={(props) => (
                <Redirect to={`/products/${props.match.params.category}/p/1`} />
              )}
            />
            <Route
              exact
              path="/products/:category/p/:pageNumber"
              render={(props) => <ProductCategory {...props} />}
            />
            <Route
              exact
              path="/product/id/:productID"
              render={(props) => <ItemPage {...props} />}
            />

            <Route
              path="/admin/dashboard"
              render={() =>
                userInfo.customer_isadmin ? <Dashboard /> : <NotAllowedPage />
              }
            ></Route>

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
