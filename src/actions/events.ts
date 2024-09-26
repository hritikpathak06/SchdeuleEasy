"use server";
import { db } from "@/lib/prisma";
import { createEventSchema } from "@/lib/zodSchema";
import { auth } from "@clerk/nextjs/server";

export async function createNewEvent(data: any) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const validatedData = createEventSchema.parse(data);
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const event = await db.event.create({
    data: {
      ...validatedData,
      userId: user.id,
    },
  });
  return event;
}

export async function getUserEvents() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const events = await db.event.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: { bookings: true },
      },
    },
  });

  return { events, username: user.username };
}
