import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const token = localStorage.getItem("token");
          const role = localStorage.getItem("role");

        if (!token) {
          return <Redirect to="/admin/login" />;
        }

        return <Component {...props} />;
      }}
    />
  );
};