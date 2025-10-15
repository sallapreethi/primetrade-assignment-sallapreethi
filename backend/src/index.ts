import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import profileRoutes from "./routes/profile.routes";  //  Make sure this import exists
import taskRoutes from "./routes/task.routes";        //  If tasks are added

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

//  Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);  //  ADD HERE
app.use("/api/tasks", taskRoutes);       //  If tasks API is ready

app.get("/", (_req, res) => {
  res.json({ ok: true, service: "primetrade backend" });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});