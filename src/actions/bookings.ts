"use server";
import { db } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { google } from "googleapis";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function createBooking(bookingData: any) {
  try {
    const event = await db.event.findUnique({
      where: { id: bookingData.eventId },
      include: { user: true },
    });

    if (!event) {
      throw new Error("Event not found");
    }
    const { data } = await clerkClient.users.getUserOauthAccessToken(
      event.user.clerkUserId,
      "oauth_google"
    );
    const token = data[0]?.token;
    if (!token) {
      throw new Error("Event creator has not connected Google Calendar");
    }
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: token });
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    const meetResponse = await calendar.events.insert({
      calendarId: "primary",
      conferenceDataVersion: 1,
      requestBody: {
        summary: `${bookingData.name} - ${event.title}`,
        description: bookingData.additionalInfo,
        start: { dateTime: bookingData.startTime },
        end: { dateTime: bookingData.endTime },
        attendees: [{ email: bookingData.email }, { email: event.user.email }],
        conferenceData: {
          createRequest: { requestId: `${event.id}-${Date.now()}` },
        },
      },
    });

    const meetLink = meetResponse.data.hangoutLink;
    const googleEventId = meetResponse.data.id;

    const booking = await db.booking.create({
      data: {
        eventId: event.id,
        userId: event.userId,
        name: bookingData.name,
        email: bookingData.email,
        startTime: bookingData.startTime,
        endTime: bookingData.endTime,
        additionalInfo: bookingData.additionalInfo,
        meetLink,
        googleEventId,
      } as any,
    });

    const { data: emailResponse, error } = await resend.emails.send({
      from: "Schedule Easy <team@qtee.ai>",
      to: [bookingData.email],
      subject: `Your Google Meet for ${event.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Hi ${bookingData.name},</h2>
          <p>Your booking for the event "<strong>${event.title}</strong>" has been confirmed.</p>
          <p>Here are the details:</p>
          <ul>
            <li><strong>Start Time:</strong> ${bookingData.startTime}</li>
            <li><strong>End Time:</strong> ${bookingData.endTime}</li>
            <li><strong>Google Meet Link:</strong> <a href="${meetLink}">${meetLink}</a></li>
          </ul>
          <p>Please click the link to join the meeting at the scheduled time.</p>
          <p>Best regards,<br />The Team</p>
        </div>
      `,
    });

    const { data: creatorEmailResponse, error: creatorEmailError } =
      await resend.emails.send({
        from: "Schedule Easy <team@qtee.ai>",
        to: [event.user.email],
        subject: `New Meeting Request for Your Event: ${event.title}`,
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Hello ${event.user.name},</h2>
          <p>You have a new meeting request for your event "<strong>${event.title}</strong>".</p>
          <p>Here are the details of the booking:</p>
          <ul>
            <li><strong>Requested by:</strong> ${bookingData.name}</li>
            <li><strong>Email:</strong> ${bookingData.email}</li>
            <li><strong>Start Time:</strong> ${bookingData.startTime}</li>
            <li><strong>End Time:</strong> ${bookingData.endTime}</li>
            <li><strong>Google Meet Link:</strong> <a href="${meetLink}">${meetLink}</a></li>
          </ul>
          <p>Best regards,<br />The Team</p>
        </div>
      `,
      });

    return { success: true, booking, meetLink };
  } catch (error: any) {
    console.error("Error creating booking:", error);
    return { success: false, error: error.message };
  }
}
