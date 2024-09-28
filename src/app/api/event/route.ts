import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();
    console.log("User ID:", userId);

    const user = await db.user.findUnique({
      where: { clerkUserId: userId as any },
    });

    if (!user) {
      return NextResponse.json(
        {
          msg: "User not found",
        },
        { status: 404 }
      );
    }

    const bookings = await db.event.findMany({
      where: { userId: user.id },
      select: {
        createdAt: true,
      },
    });

    if (bookings.length === 0) {
      return NextResponse.json({
        groupedBookings: [],
        msg: "No bookings found for this user.",
      });
    }

    interface GroupedBookings {
      [key: string]: number;
    }

    const groupedEvents = bookings.reduce<GroupedBookings>((acc, event) => {
      const date = event.createdAt.toISOString().split("T")[0]; // Get date in YYYY-MM-DD format
      acc[date] = (acc[date] || 0) + 1; // Increment count for the date
      return acc;
    }, {});

    const result = Object.entries(groupedEvents).map(([date, count]) => ({
      date,
      count,
    }));

    result.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return NextResponse.json({
      groupedEvents: result,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      {
        msg: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
