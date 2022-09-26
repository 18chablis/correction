import { Suspense } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import SplitRoute from "./Split";
import routes from "./routes";

const Routes = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        {routes.map((route) => {
          if (route.auth && route.fallback) {
            return (
              <SplitRoute token="user-token" key={route.path} {...route} />
            );
          }
          if (route.auth) {
            return (
              <PrivateRoute token="user-token" key={route.path} {...route} />
            );
          }
          return <PublicRoute key={route.path} {...route} />;
        })}
      </Switch>
    </Suspense>
  </Router>
);

export default Routes;
