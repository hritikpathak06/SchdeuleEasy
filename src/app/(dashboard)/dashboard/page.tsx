"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userNameSchema } from "@/lib/zodSchema";
import useFetch from "@/hooks/CustomFetch";
import { updateUsername } from "@/actions/userAction";
import { BarLoader } from "react-spinners";
import axios from "axios";
import LineChart from "@/components/client/Stats/LineChart";

const Page = () => {
  const { isLoaded, user }: any = useUser();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [bookingCount, setBookingCount] = useState<any>([]);
  const [eventsCount, setEventsCount] = useState<any>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  }: any = useForm({
    resolver: zodResolver(userNameSchema),
  });

  const { error, fn: fnUpdateUserName, loading } = useFetch(updateUsername);

  const onsubmit = async (data: any) => {
    fnUpdateUserName(data.username);
  };

  useEffect(() => {
    if (isLoaded && user) {
      console.log("user==> ", user);
      setUserInfo(user);
    }
    if (isLoaded) {
      setValue("username", user?.username);
    }
  }, [isLoaded]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/booking");
        setBookingCount(data.groupedBookings);
      } catch (error) {
        console.error("Error fetching booking count:", error);
      }
    })();
    (async () => {
      try {
        const { data } = await axios.get("/api/event");
        setEventsCount(data.groupedEvents);
      } catch (error) {
        console.error("Error fetching events count:", error);
      }
    })();
  }, []);

  return (
    <>
      <Card className=" bg-n-8 text-white">
        <CardHeader>
          <CardTitle>
            Welcome Back 👋 {userInfo?.firstName} {userInfo?.lastName}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card  className=" bg-n-8 text-white mt-6">
        <CardHeader>
          <CardTitle>Your Unique Link</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onsubmit)} className=" space-y-8">
            <div>
              <div className="flex items-center gap-2">
                <span>https://scheduleeasy.vercel.app/</span>
                <Input placeholder="Enter Username" {...register("username")} />
              </div>
              {errors.username && (
                <p className=" text-red-900 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
              {error && (
                <p className=" text-red-900 text-sm mt-1">{errors?.message}</p>
              )}
            </div>
            {loading && <BarLoader className=" mb-4 w-full " />}
            <Button type="submit" disabled={loading}>
              Update Username
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Graph */}

      <div className=" mb-10 mt-5">
        <LineChart data={bookingCount} title={"Bookings"} />
      </div>
      <hr />
      <div className=" mt-10">
        <LineChart data={eventsCount} title={"Events"}/>
      </div>
    </>
  );
};

export default Page;
