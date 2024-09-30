import { getUserEvents } from "@/actions/events";
import EventCard from "@/components/client/Events/EventCard";
import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense } from "react";

export default function EventPage() {
  return (
    <Suspense fallback={
      <Skeleton className=" h-[90vh] w-full bg-white"/>
    }>
      <Events />
    </Suspense>
  );
}

const Events = async() => {

 const {events,username} =  await getUserEvents();

 if(events.length === 0){
  return <p>You dont have any events</p>
 }

  return (
    <>
    <div>
      <h1 className=" text-white text-4xl font-bold mb-10">Your Events</h1>
    </div>
    <div className=" grid gap-4 grid-cols-1 lg:grid-cols-2">
      {
        events.map((event,idx) => (
          <EventCard key={idx} event={event} username={username}/>
        ))
      }
    </div>
      </>
  );
};
