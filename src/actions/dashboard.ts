"use server"
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GetBookingDetails() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const groupedBookings = db.booking.groupBy({
    by: ['createdAt'],
    _count: {
      id: true, 
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  return groupedBookings; 
}
