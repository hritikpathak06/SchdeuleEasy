import { GetUserDataByUsername } from "@/actions/userAction";
import EventCard from "@/components/client/Events/EventCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import React from "react";

export async function generateMetadata({ params }: any) {
  const user = await GetUserDataByUsername(params.username);
  if (!user) {
    return {
      title: "user not found",
    };
  }
  return {
    title: `${user.name} profile's | Schedule Easy`,
    decsription: `Book an event with ${user.name}. View Available public events and schedules`,
  };
}

const page = async ({ params }: any) => {
  const user = await GetUserDataByUsername(params.username);
  if (!user) {
    return <div>Not found</div>;
  }
  return (
    <>
      <div className=" container mx-auto px-4 py-2">
        <div className=" flex flex-col items-center mb-8">
          <Avatar className=" w-24 h-24 mb-4">
            <AvatarImage src={user.imageUrl as any} alt="UserProfile" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className=" text-3xl font-bold mb-2">{user.name}</h1>
          <p>
            Welcome to my scheduling page.Please Select to book an event to call
            me.
          </p>
        </div>

        {user.events.length === 0 ? (
          <>
            <p className=" text-center text-gray-700">
              Ooops! No events available
            </p>
          </>
        ) : (
          <>
            <div className=" grid lg:grid-cols-3 md:grid-cols-2  items-center justify-between grid-cols-1 gap-5">
              {user.events.map((event) => {
                return (
                  <EventCard
                    key={event.id}
                    event={event}
                    username={params.username}
                    isPublic
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default page;
