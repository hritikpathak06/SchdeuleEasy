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

const Page = () => {
  const { isLoaded, user }: any = useUser();
  const [userInfo, setUserInfo] = useState<any>(null);

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

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            Welcome Back 👋 {userInfo?.firstName} {userInfo?.lastName}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className=" mt-5">
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
    </>
  );
};

export default Page;
