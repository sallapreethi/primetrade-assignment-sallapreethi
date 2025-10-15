import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema";
import { listTasks, createTask, updateTask, deleteTask } from "../controllers/task.controller";

const r = Router();
r.get("/", requireAuth, listTasks);
r.post("/", requireAuth, validate(createTaskSchema), createTask);
r.put("/:id", requireAuth, validate(updateTaskSchema), updateTask);
r.delete("/:id", requireAuth, deleteTask);
export default r;