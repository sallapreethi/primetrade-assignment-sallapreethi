import { z } from "zod";

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    status: z.enum(["PENDING", "IN_PROGRESS", "DONE"]).optional(),
  }),
});

export const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    status: z.enum(["PENDING", "IN_PROGRESS", "DONE"]).optional(),
  }),
  params: z.object({ id: z.string().regex(/^\d+$/) }),
});