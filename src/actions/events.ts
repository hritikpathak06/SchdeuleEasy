"use server";
import { db } from "@/lib/prisma";
import { createEventSchema } from "@/lib/zodSchema";
import { auth } from "@clerk/nextjs/server";
import { addDays, endOfDay, format, startOfDay } from "date-fns";

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

// Get Events Details

export async function getEventDetails(username: any, eventId: any) {
  const event = await db.event.findFirst({
    where: {
      id: eventId,
      user: {
        username: username,
      },
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
          username: true,
        },
      },
    },
  });

  return event;
}

export async function getEventsAvailability(eventId: any) {
  const event = await db.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      user: {
        include: {
          availability: {
            select: {
              days: true,
              timeGap: true,
            },
          },
          bookings: {
            select: {
              startTime: true,
              endTime: true,
            },
          },
        },
      },
    },
  });

  if (!event || !event.user.availability) {
    return [];
  }

  const { availability, bookings } = event.user;

  const startDate = startOfDay(new Date());
  const endDate = addDays(startDate, 30);

  const availableDates = [];

  for (let date = startDate; date <= endDate; addDays(date, 1)) {
    const dayOfWeek = format(date, "EEEE").toUpperCase();
    const dayAvailability = availability.days.find((d) => d.day === dayOfWeek);

    if (dayAvailability) {
      const dateStr = format(date, "yyy-MM-dd");
      const slots = generateAvailableSlots(
        dayAvailability.startTime,
        dayAvailability.endTime,
        event.duration,
        bookings,
        dateStr,
        availability.timeGap
      );

      availableDates.push({
        date: dateStr,
        slots,
      });
    }
  }

  return availableDates;
}

function generateAvailableSlots(
  startTime: any,
  endTime: any,
  duration: any,
  bookings: any,
  dateStr: any,
  timeGap = 0 as any
) {

  const slots = [];

  

}
