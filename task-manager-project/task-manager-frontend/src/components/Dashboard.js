import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("❌ Error fetching tasks:", err);
      alert("Please login again.");
      navigate("/login");
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchTasks();
  }, []);

  const markAsDone = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { status: "Done" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTasks();
    } catch (err) {
      console.error("❌ Error updating task:", err);
      alert("Failed to update task");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Task deleted");
      fetchTasks();
    } catch (err) {
      console.error("❌ Error deleting task:", err);
      alert("Failed to delete task");
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>📋 Your Tasks</h2>

        <Link to="/create">
          <button style={{ marginBottom: "10px" }}>+ Create New Task</button>
        </Link>

        {tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                {task.title} - <strong>{task.status}</strong>
                {task.status !== "Done" && (
                  <button
                    onClick={() => markAsDone(task.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    ✅ Mark as Done
                  </button>
                )}
                <button
                  onClick={() => handleDelete(task.id)}
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "red",
                    color: "white",
                  }}
                >
                  🗑️ Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Dashboard;
