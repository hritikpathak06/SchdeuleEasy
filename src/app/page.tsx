import React from "react";
import Poster from "../assets/logo.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import KeyFeatures from "@/components/client/LandingPage/KeyFeatures";

const Home = () => {
  return (
    <>
      <main className=" container mx-auto px-4 py-6 ">
        <div className=" w-[80%] mx-auto flex flex-col items-center justify-between">
          <div className=" flex flex-col items-center gap-3">
            <h1 className=" text-7xl font-extrabold py-5 text-center">
              Your Online Meeting Scheduler
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
            <Button className="  w-1/5 py-3 px-6">
              <Link href={"/dashboard"} className="flex items-center gap-2">
                Get Started
                <ArrowRightIcon className=" h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div>
            <Image alt="poster" width={300} height={300} src={Poster} />
          </div>
        </div>

        {/* key Features */}
        <div className=" mb-24 w-[80%] mx-auto">
          <KeyFeatures />
        </div>
      </main>
    </>
  );
};

export default Home;
