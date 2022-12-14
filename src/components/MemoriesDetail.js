import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./MemoriesDetail.css";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const MemoriesDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs, setInputs] = useState({});
  const [image, setImage] = useState("");

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchDetails = async () => {
    const res = await axios
      .get(`https://memoriesapp-backend.onrender.com/api/memories/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.memories);
      setInputs({
        title: data.memories.title,
        description: data.memories.description,
        // image: data.memories.image,
      });
    });
  }, [id]);

  const postDetails = (images) => {
    if (images.type === "image/jpeg" || images.type === "image/png") {
      const data = new FormData();
      data.append("file", images);
      data.append("upload_preset", "memories");
      data.append("cloud_name", "deoatleff");
      fetch("https://api.cloudinary.com/v1_1/deoatleff/image/upload", {
        method: "put",
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

  const sendRequest = async () => {
    const res = await axios
      .put(
        `https://memoriesapp-backend.onrender.com/api/memories/update/${id}`,
        {
          title: inputs.title,
          description: inputs.description,
          image: image,
        }
      )
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  console.log(blog);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/usermemories"));
  };

  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin={"auto"}
            marginTop={3}
            display="flex"
            flexDirection={"column"}
            width={"80%"}
          >
            <Typography
              fontWeight="bold"
              fontSize="30px"
              padding={1}
              color="grey"
              className="Heading"
            >
              Update Your Memories
            </Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField
              name="title"
              onChange={handleChange}
              value={inputs.title}
              margin="auto"
              variant="outlined"
            />
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField
              name="description"
              onChange={handleChange}
              value={inputs.description}
              margin="auto"
              variant="outlined"
            />
            {/* <InputLabel sx={labelStyles}>Image</InputLabel>
            <TextField
              name="image"
              margin="auto"
              variant="outlined"
              onChange={handleChange}
              value={inputs.image}
            /> */}
            <InputLabel sx={labelStyles}>Image</InputLabel>
            <TextField
              name="image"
              type="file"
              id="custom-file"
              margin="auto"
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
      )}
    </div>
  );
};

export default MemoriesDetail;
