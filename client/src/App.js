import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import ProductCategory from "./components/ProductCategory";
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
import CartContext from "./context/CartContext";
import cartTotalPriceContext from "./context/cartTotalPrice";
import Home from "./components/Home";
import Cart from "./components/Cart";
import ProductForm from "./components/ProductForm";
import ManageCustomers from "./components/ManageCustomers";
import AddNewAdmin from "./components/AddNewAdmin";
import DemoteUserPage from "./components/DemoteUserPage";

function App() {
  const [userInfo, setUserInfo] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  useEffect(() => {
    if (!userInfo.customer_id) {
      grabUserInfo();
    }
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
        <CartContext.Provider value={[cartItems, setCartItems]}>
          <cartTotalPriceContext.Provider
            value={[cartTotalPrice, setCartTotalPrice]}
          >
            <div>
              <Navbar />
              <Switch>
                <Route exact path="/customer/cart" render={() => <Cart />} />
                <Route
                  exact
                  path="/"
                  render={(props) => <Redirect to="/home" {...props} />}
                />
                <Route
                  exact
                  path="/home"
                  render={(props) => <Home {...props} />}
                />
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
                    <Redirect
                      to={`/products/${props.match.params.category}/p/1`}
                    />
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
                  exact
                  path="/admin/dashboard"
                  render={() =>
                    userInfo?.customer_isadmin ? (
                      <Dashboard />
                    ) : (
                      <NotAllowedPage />
                    )
                  }
                />
                <Route
                  exact
                  path="/admin/dashboard/add-product"
                  render={() =>
                    userInfo?.customer_isadmin ? (
                      <ProductForm />
                    ) : (
                      <NotAllowedPage />
                    )
                  }
                />
                <Route
                  exact
                  path="/admin/dashboard/manage-customers"
                  render={() =>
                    userInfo?.customer_isadmin ? (
                      <ManageCustomers />
                    ) : (
                      <NotAllowedPage />
                    )
                  }
                />
                <Route
                  exact
                  path="/admin/dashboard/promote-user"
                  render={() =>
                    userInfo?.customer_isadmin ? (
                      <AddNewAdmin />
                    ) : (
                      <NotAllowedPage />
                    )
                  }
                />
                <Route
                  exact
                  path="/admin/dashboard/demote-admin"
                  render={() =>
                    userInfo?.customer_isadmin ? (
                      <DemoteUserPage />
                    ) : (
                      <NotAllowedPage />
                    )
                  }
                />
                <Route
                  exact
                  path="/about"
                  render={(props) => <About {...props} />}
                />
              </Switch>
              <StickyFooter />
            </div>
          </cartTotalPriceContext.Provider>
        </CartContext.Provider>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
