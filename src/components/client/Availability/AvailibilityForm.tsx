"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { availabilitySchema } from "@/lib/zodSchema";
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
import { timeSlots } from "@/lib/dummy";

const AvailibilityForm = ({ initialData }: any) => {
  console.log("Initilal data==> ", initialData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(availabilitySchema),
    defaultValues: { ...initialData },
  });

  return (
    <>
      <form action="">
        {[
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ].map((day: any) => {
          const isAvailable = watch(`${day.isAvailable}`);

          return (
            <div key={day} className=" flex items-center space-x-4 mb-4">
              <Controller
                name={`${day.isAvailable}`}
                control={control}
                render={(field: any) => {
                  return (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        setValue(`${day.isAvailable}`, checked);
                        if (!checked) {
                          setValue(`${day.startTime}`, "09:00");
                          setValue(`${day.endTime}`, "17:00");
                        }
                      }}
                    />
                  );
                }}
              />

              <span className=" w-24">
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </span>

              {isAvailable && (
                <>
                  <Controller
                    name={`${day.startTime}`}
                    control={control}
                    render={(field: any) => {
                      return (
                        <>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Start Time" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((time) => {
                                return (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </>
                      );
                    }}
                  />
                  <span>to</span>

                  <Controller
                    name={`${day.endTime}`}
                    control={control}
                    render={(field: any) => {
                      return (
                        <>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="End Time" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((time) => {
                                return (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </>
                      );
                    }}
                  />
                  {(errors[day]?.message as any) && (
                    <p className=" text-red-600 text-sm ml-2">
                      {errors[day]?.message as any}
                    </p>
                  )}
                </>
              )}
            </div>
          );
        })}
      </form>
    </>
  );
};

export default AvailibilityForm;
