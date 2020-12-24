import React, { useEffect } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "upkit/dist/style.min.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import RegisterSuccess from "./pages/RegisterSuccess";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import UserAccount from "./pages/UserAccount";
import UserAddress from "./pages/UserAddress";
import UserAddressAdd from "./pages/UserAddressAdd";
import UserOrders from "./pages/UserOrders";
import Checkout from "./pages/Checkout";
import Invoice from "./pages/Invoice";
import GuestOnlyRoute from "./components/GuardOnlyRoute";
import GuestRoute from "./components/GuardRoute";
import { getCart } from "./api/cart";
import { listen } from "./app/listener";
import { Provider } from "react-redux";
import store from "./app/store";

function App() {
  useEffect(() => {
    listen();
    getCart();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <GuestRoute path="/logout">
            <Logout />
          </GuestRoute>
          <GuestRoute path="/pesanan">
            <UserOrders />
          </GuestRoute>
          <GuestRoute path="/account">
            <UserAccount />
          </GuestRoute>
          <GuestRoute path="/invoice/:order_id">
            <Invoice />
          </GuestRoute>
          <GuestRoute path="/checkout">
            <Checkout />
          </GuestRoute>
          <GuestRoute path="/alamat-pengiriman/tambah">
            <UserAddressAdd />
          </GuestRoute>
          <GuestRoute path="/alamat-pengiriman">
            <UserAddress />
          </GuestRoute>
          <GuestOnlyRoute path="/register/berhasil">
            <RegisterSuccess />
          </GuestOnlyRoute>
          <GuestOnlyRoute path="/register">
            <Register />
          </GuestOnlyRoute>
          <GuestOnlyRoute path="/login">
            <Login />
          </GuestOnlyRoute>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
