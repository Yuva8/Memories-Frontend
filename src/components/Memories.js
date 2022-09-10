import React, { useState, useEffect } from "react";
import axios from "axios";
import Singlememories from "./Singlememories";
import "./Memories.css";
const Memories = () => {
  const [memories, setMemories] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("https://memoriesapp-yuvi.herokuapp.com/api/memories")
      .catch((err) => console.error(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setMemories(data.memories));
  }, []);
  console.log(memories);
  return (
    <div>
      {memories &&
        memories.map((mem, index) => (
          <Singlememories
            id={mem._id}
            isUser={localStorage.getItem("userId") === mem.user._id}
            user={mem.user.name}
            title={mem.title}
            description={mem.description}
            image={mem.image}
            createdAt={mem.createdAt}
            updatedAt={mem.updatedAt}
          />
        ))}
    </div>
  );
};

export default Memories;
