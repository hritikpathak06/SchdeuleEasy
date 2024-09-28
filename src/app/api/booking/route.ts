import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();
    console.log("User ID:", userId); // Debug log for userId

    const user = await db.user.findUnique({
      where: { clerkUserId: userId as any }, // Adjust to match your user identifier
    });

    if (!user) {
      return NextResponse.json(
        {
          msg: "User not found",
        },
        { status: 404 }
      );
    }

    // Fetch all bookings created by the user using user.id
    const bookings = await db.booking.findMany({
      where: { userId: user.id }, // Use userId to filter bookings
      select: {
        createdAt: true, // Select the createdAt field
      },
    });

    console.log("Bookings:", bookings); // Debug log for fetched bookings

    // Check if bookings array is empty
    if (bookings.length === 0) {
      return NextResponse.json({
        groupedBookings: [],
        msg: "No bookings found for this user.",
      });
    }

    interface GroupedBookings {
        [key: string]: number;
      }
      
      // Group bookings by date
      const groupedBookings = bookings.reduce<GroupedBookings>((acc, booking) => {
        const date = booking.createdAt.toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
        acc[date] = (acc[date] || 0) + 1; // Increment count for the date
        return acc;
      }, {});
      
      // Convert the grouped data into an array
      const result = Object.entries(groupedBookings).map(([date, count]) => ({
        date,
        count,
      }));
      
      // Sort results by date
      result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      return NextResponse.json({
        groupedBookings: result,
      });
    

  } catch (error) {
    console.error("Error fetching bookings:", error); // Log the error for debugging
    return NextResponse.json(
      {
        msg: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
