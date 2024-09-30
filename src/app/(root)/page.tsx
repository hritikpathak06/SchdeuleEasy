import React from "react";
import Poster from "../../assets/logo.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import KeyFeatures from "@/components/client/LandingPage/KeyFeatures";
import Features from "@/components/client/LandingPage/Features";
import BookingLanding from "@/components/client/LandingPage/BookingLanding";

const Home = () => {
  return (
    <>
      <main className=" container mx-auto px-4 py-6 bg-n-8">
        <div className=" w-[80%] mx-auto flex flex-col items-center justify-between">
          <div className=" flex flex-col items-center gap-3">
            <h1 className="md:text-7xl text-3xl font-extrabold py-5 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Effortless Meeting Scheduling
            </h1>

            <p className=" text-xl text-gray-700 mb-10 text-center">
              Experience the convenience of effortless scheduling with our
              online meeting scheduler. Designed for individuals and teams
              alike, our platform eliminates the hassle of back-and-forth
              emails, allowing you to effortlessly set up meetings, manage your
              calendar, and connect with colleagues and clients at any time,
              from anywhere. Say goodbye to scheduling conflicts and hello to
              streamlined productivity.
            </p>
            <Button className="  md:w-1/5 w-full py-3 px-6">
              <Link href={"/dashboard"} className="flex items-center gap-2">
                Get Started
                <ArrowRightIcon className=" h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className=" mt-4">
            <video className=" w-full h-max" controls autoPlay muted loop>
              <source
                src="https://res.cloudinary.com/drbzzh6j7/video/upload/v1727529368/ScheduleEasy/yzxyj6vwcdj2fny6ofur.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <hr className=" mt-10" />

        {/* key Features */}
        <div className=" mb-24 w-[80%] mx-auto mt-20">
          {/* <KeyFeatures /> */}
          <Features />
        </div>

        <div>
          <BookingLanding />
        </div>
      </main>
    </>
  );
};

export default Home;
