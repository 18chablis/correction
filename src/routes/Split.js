import React from "react";
import { Route } from "react-router";
import Base from "../Base";

const SplitRoute = ({
  component: Component,
  fallback: Fallback,
  isAuthenticated,
  token: Token,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem(Token) ? (
        <Base>
          <Component {...props} />
        </Base>
      ) : (
        <Base>
          <Fallback {...props} />
        </Base>
      )
    }
  />
);
export default SplitRoute;
