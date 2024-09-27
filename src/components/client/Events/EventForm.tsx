import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createEventSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/CustomFetch";
import { createNewEvent } from "@/actions/events";
import { useRouter } from "next/navigation";

const EventForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  }: any = useForm({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      duration: 30,
      isPrivate: true,
    },
  });

  const router = useRouter();

  const { loading, error, fn: createEvent } = useFetch(createNewEvent);
  const onsubmit = async (data: any) => {
    await createEvent(data);
    router.refresh();
  };
  return (
    <>
      <div>
        <form
          action=""
          className="px-6 flex flex-col gap-5"
          onSubmit={handleSubmit(onsubmit)}
        >
          <div>
            <Label
              htmlFor="title"
              className="block text-sm font-medium text-gray-900"
            >
              Event title
            </Label>
            <Input
              placeholder="Enter event title"
              {...register("title")}
              className="mt-1"
            />
            {errors.title && (
              <p className=" text-red-900 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="description"
              className="block text-sm font-medium text-gray-900"
            >
              Event Description
            </Label>
            <Input
              placeholder="Enter event description"
              {...register("description")}
              className="mt-1"
            />
            {errors.description && (
              <p className=" text-red-900 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-900"
            >
              Event Duration
            </Label>
            <Input
              placeholder="Enter event duration"
              {...register("duration", { valueAsNumber: true })}
              className="mt-1"
            />
            {errors.duration && (
              <p className=" text-red-900 text-sm mt-1">
                {errors.duration.message}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="isPrivate"
              className="block text-sm font-medium text-gray-900"
            >
              Event Privacy
            </Label>
            <Controller
              name="isPrivate"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value ? "true" : "false"}
                  onValueChange={(val) => field.onChange(val == "true")}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select Privacy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">True</SelectItem>
                    <SelectItem value="false">False</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            {errors.isPrivate && (
              <p className=" text-red-900 text-sm mt-1">
                {errors.isPrivate.message}
              </p>
            )}
          </div>
          <Button type="submit" disabled={loading}>
            Create Event
          </Button>
        </form>
      </div>
    </>
  );
};

export default EventForm;
