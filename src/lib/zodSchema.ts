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

export const daySchema = z
  .object({
    isAvailable: z.boolean(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  })
  .refine(
    (data: any) => {
      if (data.isAvailable) {
        return data.startTime < data.endTime;
      }
      return true;
    },
    {
      message: "End time must be more than the start time",
      path: ["endTime"],
    }
  );

export const availabilitySchema = z.object({
  monday: daySchema,
  tuesday: daySchema,
  wednesday: daySchema,
  thursday: daySchema,
  friday: daySchema,
  saturday: daySchema,
  sunday: daySchema,
  timeGap: z.number().min(0, "Time gap must be 0 or more minutes").int(),
});


export const bookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
  additionalInfo: z.string().optional(),
});