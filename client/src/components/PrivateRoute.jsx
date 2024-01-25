import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUsers } = useSelector((state) => state.user);
  return currentUsers ? <Outlet /> : <Navigate to="/sign-in" />;
}
