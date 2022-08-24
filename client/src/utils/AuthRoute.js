import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

function AuthRoute(props) {
  const auth = useContext(AuthContext);

  if (auth.user === null) {
    return <Navigate to="/" replace={true} />;
  }

  return (props.children ? props.children : <Outlet />);
}

export default AuthRoute;
