import { z } from "zod";

export const userNameSchema = z.object({
  username: z
    .string()
    .max(15)
    .min(3)
    .regex(/^[a-z_]+$/, "Username can contain only lowercase and underscores"),
});

export const createEventSchema = z.object({
  title: z
    .string()
    .min(1, "Title Should be greater than 1 character")
    .max(100, "Maximum 100 character are allowed only"),
  description: z
    .string()
    .min(1, "Title Should be greater than 1 character")
    .max(100, "Maximum 100 character are allowed only"),
  duration: z.number().int().positive("duration must be positive"),
  isPrivate: z.boolean(),
});
