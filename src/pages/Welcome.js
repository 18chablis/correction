import React from "react";
import { Link, useHistory } from "react-router-dom";
import "../styles/landing.css";

const Welcome = () => {
  const token = localStorage.getItem("user-token");
  const history = useHistory();
  return (
    <>
      {token !== null && token === "" ? (
        history.push("/dashboard")
      ) : (
        <section className="landing">
          <div className="dark-overlay">
            <div className="landing-inner">
              <h1>Hermann Trucking Application Manager</h1>
              <p>You should login first to continue</p>
              <br />
              <div className="buttons">
                <Link to="/login" className="btn">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Welcome;
