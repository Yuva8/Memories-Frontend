import React, { useState } from "react";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Addmemories.css";
const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
const Addmemories = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const sendRequest = async () => {
    const res = await axios
      .post("https://memoriesapp-yuvi.herokuapp.com/api/memories/create", {
        title: title,
        description: description,
        image: image,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const postDetails = (images) => {
    if (images.type === "image/jpeg" || images.type === "image/png") {
      const data = new FormData();
      data.append("file", images);
      data.append("upload_preset", "memories");
      data.append("cloud_name", "deoatleff");
      fetch("https://api.cloudinary.com/v1_1/deoatleff/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImage(data.url.toString());
          console.log(image);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return "Please Select an Image";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, description, image);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/memories"));
  };
  return (
    <div className="col-xs-12 col-sm-12 ">
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderColor="gray"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={3}
          marginBottom={3}
          display="flex"
          flexDirection={"column"}
          width={"80%"}
        >
          <Typography
            fontWeight={"bold"}
            padding={1}
            variant="h3"
            textAlign={"center"}
            fontSize="30px"
            color="grey"
            className="Heading"
          >
            Post Your Memories
          </Typography>
          <InputLabel sx={labelStyles} border="1 solid grey">
            Title
          </InputLabel>
          <TextField
            name="title"
            margin="auto"
            variant="outlined"
            value={title}
            border="1 solid black"
            onChange={(e) => setTitle(e.target.value)}
          />
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField
            name="description"
            margin="auto"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* <InputLabel sx={labelStyles}>Image</InputLabel> */}
          {/* <TextField
            name="imageURL"
            margin="auto"
            variant="outlined"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          /> */}
          <InputLabel sx={labelStyles}>Image</InputLabel>
          <TextField
            name="image"
            type="file"
            id="custom-file"
            className="Image"
            // onChange={(e) => setImage(e.target.value)}
            onChange={(e) => postDetails(e.target.files[0])}
          />

          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            color="warning"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Addmemories;
