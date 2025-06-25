const express = require("express");
const cors = require("cors");
const app = express();

const sequelize = require("./config/db");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/taskRoutes"); // ✅ ADD THIS

const User = require("./models/User");
const Task = require("./models/Task");

app.use(cors());
app.use(express.json());

// ✅ Mount both auth and task routes
app.use("/api", authRoutes);
app.use("/api", taskRoutes); // ✅ ADD THIS

app.get("/", (req, res) => {
  res.send("✅ Backend is running...");
});

sequelize
  .sync({ alter: true })
  .then(() => console.log("✅ Tables synced"))
  .catch((err) => console.log("❌ Table sync error:", err));

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
