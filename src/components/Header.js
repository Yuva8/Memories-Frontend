import React from "react";
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "navy" }}
    >
      <div className="container">
        <Typography variant="h4" color="white">
          Memories
        </Typography>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            {isLoggedIn ? (
              <React.Fragment>
                <NavLink className="nav-item nav-link" to="/memories">
                  All memories
                </NavLink>
                <NavLink className="nav-item nav-link" to="/usermemories">
                  User memories
                </NavLink>
                <NavLink className="nav-item nav-link" to="/memories/add">
                  Add memories
                </NavLink>
                <NavLink
                  className="nav-item nav-link"
                  to="/auth"
                  onClick={() => dispatch(authActions.logout())}
                  style={{ marginLeft: "20px" }}
                >
                  Logout
                </NavLink>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <NavLink className="nav-item nav-link" to="/auth">
                  Login
                </NavLink>
                <NavLink className="nav-item nav-link" to="/auth">
                  Sign Up
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
