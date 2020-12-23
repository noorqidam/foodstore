import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { LayoutOne } from "upkit";
import { logout } from "../../api/auth";
import { userLogout } from "../../features/Auth/actions";

export default function Logout() {
  let history = useHistory();
  let dispatch = useDispatch();

  useEffect(() => {
    logout()
      .then(() => dispatch(userLogout()))
      .then(() => history.push("/"));
  }, [history, dispatch]);
  
  return (
    <LayoutOne>
      <div className="text-center flex flex-col justify-center items-center">
        <BounceLoader color="red" />
        <br />
        Logging out ...
      </div>
    </LayoutOne>
  );
}
