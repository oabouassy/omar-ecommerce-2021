import { useState, useEffect } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Products from "./components/Products";
import ProductCategory from "./components/ProductCategory";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import NotAllowedPage from "./components/NotAllowedPage";
import SignUp from "./components/SignUp";
import StickyFooter from "./components/StickyFooter";
import UserContext from "./context/userContext";

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
          <Header />
          <Switch>
            <Route
              exact
              path="/about"
              render={(props) => <About {...props} />}
            />

            <Route
              exact
              path="/products"
              render={(props) => <Products {...props} />}
            />
            <Route
              exact
              path="/products/:category"
              render={(props) => <ProductCategory {...props} />}
            />
            <Route
              path="/admin/dashboard"
              render={() =>
                !userInfo.customer_isadmin ? <Dashboard /> : <NotAllowedPage />
              }
              // REMOVE THE ! from the start of (userInfo.customer_isadmin)
            ></Route>
            <Route
              path="/auth/login"
              render={(props) => <Login {...props} />}
            />

            <Route
              path="/auth/signup"
              render={(props) => <SignUp {...props} />}
            />
          </Switch>
          <StickyFooter />
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
