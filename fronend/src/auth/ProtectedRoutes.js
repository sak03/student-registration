import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoutes = () => {
  const userLoginInfo = useSelector((state) => state.userLoginInfo);
  // console.log("userLoginInfo", userLoginInfo)

  return (
    userLoginInfo != null ? (
      <Outlet />
    ) : (
      <Navigate
        to={{
          pathname: "/",
        }}
      />))
};

export default ProtectedRoutes;
