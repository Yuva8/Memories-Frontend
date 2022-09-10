import React, { useEffect, useState } from "react";
import axios from "axios";
import Singlememories from "./Singlememories";

const Usermemories = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios
      .get(`https://memoriesapp-yuvi.herokuapp.com/api/memories/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);

  console.log(user);
  return (
    <div className="profileContainer">
      {user &&
        user.memories &&
        user.memories.map((mem, index) => (
          <Singlememories
            id={mem._id}
            key={index}
            isUser={true}
            user={user.name}
            title={mem.title}
            description={mem.description}
            image={mem.image}
            createdAt={mem.createdAt}
          />
        ))}
    </div>
  );
};

export default Usermemories;
