import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Singlememories.css";
const singlememories = ({
  title,
  description,
  image,
  user,
  isUser,
  id,
  createdAt,
  updatedAt,
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/mymemories/${id}`);
  };
  const deleteRequest = async () => {
    const res = await axios
      .delete(`https://memoriesapp-yuvi.herokuapp.com/api/memories/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest().then(() => navigate("/memories/add"));
  };

  return (
    <div className="profileContainer">
      <Card
        sx={{
          width: "50%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {isUser && (
          <Box display="flex" className="landingbox">
            <Button
              onClick={handleEdit}
              variant="contained"
              color="warning"
              className="landingbutton"
            >
              Edit
            </Button>
            <Button
              onClick={handleDelete}
              variant="contained"
              sx={{ marginLeft: "15px" }}
              color="warning"
              className="landingbutton"
            >
              Delete
            </Button>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {user ? user.charAt(0).toUpperCase() : ""}
            </Avatar>
          }
          title={title}
          subheader={`Created on ${createdAt.substring(0, 10)} `}
        />
        <CardMedia
          component="img"
          height="350"
          image={image}
          alt="Paella dish"
          className="landingimg"
          style={{
            alignItems: "center",

            height: "100%",
          }}
        />
        <br />
        <CardContent>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary">
            <b>{user}</b> {": "} {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default singlememories;
