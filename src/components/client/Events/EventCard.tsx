import React from "react";

const EventCard = ({ event, username }: any) => {
  return (
    <div>
      <h1>Event card</h1>
      <h1>{event.title}</h1>
    </div>
  );
};

export default EventCard;
