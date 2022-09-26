import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../actions/auth.action";
import { clearMessage } from "../actions/error.action";

function Login() {
  const { message } = useSelector((state) => state.message);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  async function handleLogin(e) {
    e.preventDefault();
    setDisable(true);
    dispatch(loginAction({ email, password }, history));
    setTimeout(function () {
      setDisable(false);
      dispatch(clearMessage());
    }, 5000);
  }
  return (
    <div className="landing">
      <div className="login-form">
        {message ? (
          <div style={{ zIndex: "999999" }} className="success">
            {message}
          </div>
        ) : null}
        <h1 className="heading">Login</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign Into Your Account
        </p>
        <br />
        <form className="form" method="POST" onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            disabled={disable}
            type="submit"
            className="btn"
            value={disable ? "Loading ..." : "Sign in"}
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
