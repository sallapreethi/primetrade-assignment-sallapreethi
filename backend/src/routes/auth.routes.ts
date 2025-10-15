import { Router } from "express";
import { login, signup } from "../controllers/auth.controller";
import { validate } from "../middleware/validate";
import { loginSchema, signupSchema } from "../schemas/auth.schema";

const r = Router();
r.post("/signup", validate(signupSchema), signup);
r.post("/login", validate(loginSchema), login);
export default r;