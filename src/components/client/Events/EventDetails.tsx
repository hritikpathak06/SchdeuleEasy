import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, ClockIcon } from "lucide-react";
import React from "react";

const EventDetails = ({ event }: any) => {
  const { user } = event;

  return (
    <div className="p-10 lg:w-1/3 bg-white">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <div className="flex items-center mb-4">
        <Avatar className="w-12 h-12 mr-4">
          <AvatarImage src={user.imageUrl as any} alt="UserProfile" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
          <p className="text-gray-600">@{user.username}</p>
        </div>
      </div>

      <div className="flex items-center mb-2">
        <ClockIcon className="h-6 w-6" />
        <span>{event.duration} minutes</span>
      </div>

      <div className="flex items-center mb-4">
        <Calendar className="h-6 w-6" />
        <span>Google Meet</span>
      </div>

      <p className="text-gray-600 w-full  break-words max-w-full">
        {event.description}
      </p>
    </div>
  );
};

export default EventDetails;
