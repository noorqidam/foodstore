import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const GuardOnlyRoute = ({ children, ...rest }) => {
  let { user } = useSelector((state) => state.auth);
  return <Route {...rest}>{!user ? children : <Redirect to="/" />}</Route>;
};

export default GuardOnlyRoute;
