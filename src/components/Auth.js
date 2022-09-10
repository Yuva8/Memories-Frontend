import { Button, Typography, TextField, Box } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { authActions } from "../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const sendReq = async (type = "login") => {
    const res = await axios
      .post(`https://memoriesapp-yuvi.herokuapp.com/api/user/${type}`, {
        name: name,
        email: email,
        password: password,
      })
      .catch((err) => {
        console.log(err);
      });
    const data = await res.data;
    console.log(data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password);
    if (isSignup) {
      sendReq("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/memories"))
        .then((data) => console.log(data));
    } else {
      sendReq()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/memories"))
        .then((data) => console.log(data));
    }
  };
  return (
    <div className="col-xs-12 col-sm-12 ">
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h3" padding={2} textAlign="center">
            {isSignup ? "Sign up" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              margin="normal"
              placeholder="Name"
              type={"name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></TextField>
          )}
          <TextField
            name="email"
            margin="normal"
            placeholder="Email"
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
          <TextField
            name="password"
            margin="normal"
            placeholder="Password"
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></TextField>
          <Button
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="info"
            type="submit"
          >
            Submit
          </Button>
          <Button
            sx={{ borderRadius: 3, marginTop: 3 }}
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Change to Login" : "new account : Sign up"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
