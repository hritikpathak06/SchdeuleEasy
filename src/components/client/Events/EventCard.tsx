"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LinkIcon, Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteSingleEvent } from "@/actions/events";

const EventCard = ({ event, username, isPublic = false }: any) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const router = useRouter();

  const handleCopyEvent = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/${username}/${event.id}`
      );
      setIsCopied(true);
      toast.success("Link Copied Successfully");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy!");
    }
  };

  const handleDeleteEvent = async (eventId: any) => {
    await deleteSingleEvent(eventId);
    toast.success("Event Deleted successully");
    router.refresh();
  };

  return (
    <>
      <div>
        <Card className=" flex flex-col justify-between cursor-pointer">
          <CardHeader>
            <CardTitle className=" text-2xl">{event.title}</CardTitle>
            <CardDescription className=" flex justify-between">
              <span>
                {event.duration} min | {event.isPrivate ? "Private" : "Public"}
              </span>
              <span>{event._count.bookings} bookings</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              {event.description.substring(0, event?.decsription?.indexOf("."))}
            </p>
          </CardContent>
          {!isPublic && (
            <CardFooter className="flex justify-between">
              <Button
                className=" flex items-center gap-2"
                onClick={handleCopyEvent}
              >
                <LinkIcon className=" h-4 w-4" />
                {isCopied ? "Copied" : "Copy Link"}
              </Button>
              <Button
                className="flex items-center gap-2"
                variant={"destructive"}
                onClick={() => handleDeleteEvent(event.id)}
              >
                <Trash className=" h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </>
  );
};

export default EventCard;
