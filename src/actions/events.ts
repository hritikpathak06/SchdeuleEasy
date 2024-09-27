"use server";
import { db } from "@/lib/prisma";
import { createEventSchema } from "@/lib/zodSchema";
import { auth } from "@clerk/nextjs/server";

// Create Event
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

// Get Event
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

// Delete Event
export async function deleteSingleEvent(eventId: any) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user: any = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  const event = await db.event.findUnique({
    where: {
      id: eventId,
    },
  });
  if (!event || event.userId !== user.id) {
    throw new Error("Event not found");
  }
  await db.event.delete({
    where: {
      id: eventId,
    },
  });

  return { msg: "Event Deleted Succefully" };
}
