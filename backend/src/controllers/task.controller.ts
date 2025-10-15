import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export async function listTasks(req: Request & { userId?: number }, res: Response) {
  const { q, status } = req.query as { q?: string; status?: string };
  const items = await prisma.task.findMany({
    where: {
      userId: req.userId!,
      title: q ? { contains: q, mode: "insensitive" } : undefined,
      status: status ? (status as any) : undefined,
    },
    orderBy: { createdAt: "desc" },
  });
  return res.json({ success: true, data: { items } });
}

export async function createTask(req: Request & { userId?: number }, res: Response) {
  const { title, description, status } = req.body as any;
  const t = await prisma.task.create({
    data: { title, description, status: status ?? "PENDING", userId: req.userId! },
  });
  return res.status(201).json({ success: true, data: t });
}

export async function updateTask(req: Request & { userId?: number }, res: Response) {
  const id = Number((req.params as any).id);
  const { title, description, status } = req.body as any;
  const t = await prisma.task.update({
    where: { id },
    data: { title, description, status },
  });
  return res.json({ success: true, data: t });
}

export async function deleteTask(req: Request & { userId?: number }, res: Response) {
  const id = Number((req.params as any).id);
  await prisma.task.delete({ where: { id } });
  return res.json({ success: true });
}