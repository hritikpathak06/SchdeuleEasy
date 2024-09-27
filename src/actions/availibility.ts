"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { any } from "zod";

export async function getUserAvailability() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // const user = await db.user.findUnique({
  //   where: { clerkUserId: userId },
  //   include: {
  //     availability: { days: true } as any,
  //   },
  // });

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      availability: {
        include: {
          days: true,
        },
      },
    },
  });

  if (!user || !user.availability) {
    return null;
  }

  const availabilityData: {
    timeGap: string;
    [key: string]: any; // Allows dynamic keys for days of the week
  } = {
    timeGap: user.availability.timeGap as any,
  };

  [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ].forEach((day) => {
    const dayAvailability: any = user?.availability?.days?.find(
      (d: any) => d.day === day.toUpperCase()
    );

    availabilityData[day] = {
      isAvailable: !!dayAvailability,
      startTime: dayAvailability
        ? dayAvailability.startTime.toISOString().slice(11, 16)
        : "09:00",
      endTime: dayAvailability
        ? dayAvailability.endTime.toISOString().slice(11, 16)
        : "17:00",
    };
  });

  return availabilityData;
}
