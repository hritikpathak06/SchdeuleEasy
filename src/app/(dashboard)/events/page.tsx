import { getUserEvents } from "@/actions/events";
import EventCard from "@/components/client/Events/EventCard";
import React, { Suspense } from "react";

export default function EventPage() {
  return (
    <Suspense fallback={<div>Loading events....</div>}>
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
    <div>
      {
        events.map((event,idx) => (
          <EventCard key={idx} event={event} username={username}/>
        ))
      }
    </div>
  );
};
