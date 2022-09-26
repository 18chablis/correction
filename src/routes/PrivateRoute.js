import React from "react";
import { Route, Redirect } from "react-router";
import Base from "../Base";

const PrivateRoute = ({ component: Component, token: Token, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem(Token) ? ( //line changed replaced:isAuthenticated
        <Base>
          <Component {...props} />
        </Base>
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
