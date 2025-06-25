import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function CreateTask() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/tasks",
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Task created!");
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Error creating task:", err);
      alert("Failed to create task");
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Create New Task</h2>
        <form onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <button type="submit" style={{ marginLeft: "10px" }}>
            Create
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateTask;
