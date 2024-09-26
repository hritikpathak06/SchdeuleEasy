"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import EventForm from "../Events/EventForm";

export function CreateEvent() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClose = () => {
    setIsOpen(false);
    if (searchParams.get("create") === "true") {
      router.replace(window?.location?.pathname);
    }
  };
  useEffect(() => {
    const create = searchParams.get("create") as any;
    if (create === "true") {
      setIsOpen(true);
    }
  }, [searchParams]);

  return (
    <Drawer open={isOpen} onClose={handleClose}>
      <DrawerTrigger asChild></DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Create Your New Event</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div>
            <EventForm />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
