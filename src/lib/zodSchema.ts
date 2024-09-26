import { z } from "zod";

export const userNameSchema = z.object({
  username: z
    .string()
    .max(15)
    .min(3)
    .regex(/^[a-z_]+$/,"Username can contain only lowercase and underscores")
});
