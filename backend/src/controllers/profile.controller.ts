import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const getProfile = async (
  req: Request & { userId?: number },
  res: Response
) => {
  const me = await prisma.user.findUnique({
    where: { id: req.userId! },
    select: { id: true, name: true, email: true },
  });
  return res.json({ success: true, data: me });
};

export const updateProfile = async (
  req: Request & { userId?: number },
  res: Response
) => {
  const { name } = req.body as { name?: string };
  const me = await prisma.user.update({
    where: { id: req.userId! },
    data: { name: name ?? undefined },
    select: { id: true, name: true, email: true },
  });
  return res.json({ success: true, data: me });
};