import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as { name: string; email: string; password: string };
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(400).json({ success: false, message: "Email already in use" });

  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { name, email, password: hash } });

  return res.status(201).json({
    success: true,
    message: "User created",
    data: { id: user.id, name: user.name, email: user.email }
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ success: false, message: "Invalid credentials" });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: "2h" });

  return res.json({
    success: true,
    message: "Login success",
    data: { token, user: { id: user.id, name: user.name, email: user.email } }
  });
};