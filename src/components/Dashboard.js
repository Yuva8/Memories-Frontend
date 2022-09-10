import React from "react";
import { Container, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="main">
      <Container>
        <div>
          <h1 className="title">Welcome to Memories App</h1>
          <p className="subtitle">Place to store all your Memories</p>
        </div>
        <div className="buttonContainer">
          <Button
            LinkComponent={Link}
            to="/auth"
            size="large"
            variant="contained"
            color="info"
            style={{ margin: 5, borderRadius: 30 }}
          >
            Login
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
