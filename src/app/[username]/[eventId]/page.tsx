import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getEventDetails } from "@/actions/events";
import { getEventAvailability } from "@/actions/availibility";
import EventDetails from "@/components/client/Events/EventDetails";
import BookingForm from "@/components/client/Events/BookingForm";


export async function generateMetadata({ params }:any) {
  const event = await getEventDetails(params.username, params.eventId);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: `Book ${event.title} with ${event.user.name} | Your App Name`,
    description: `Schedule a ${event.duration}-minute ${event.title} event with ${event.user.name}.`,
  };
}

export default async function EventBookingPage({ params }:any) {
  const event = await getEventDetails(params.username, params.eventId);
  const availability = await getEventAvailability(params.eventId);

  if (!event) {
    notFound();
  }

  return (
    <div className="flex flex-col justify-center lg:flex-row px-4 py-8 bg-n-8 min-h-screen">
      <EventDetails event={event} />
      <Suspense fallback={<div>Loading booking form...</div>}>
        <BookingForm event={event} availability={availability} />
      </Suspense>
    </div>
  );
}