import React from "react";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Memories from "./components/Memories";
import Usermemories from "./components/Usermemories";
import MemoriesDetail from "./components/MemoriesDetail";
import AddMemories from "./components/Addmemories";
import Dashboard from "./components/Dashboard";
import { useSelector } from "react-redux";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/auth" element={<Auth />} />
            </>
          ) : (
            <>
              <Route path="/memories" element={<Memories />} />
              <Route path="/memories/add" element={<AddMemories />} />
              <Route path="/usermemories" element={<Usermemories />} />
              <Route path="/mymemories/:id" element={<MemoriesDetail />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
}

export default App;
