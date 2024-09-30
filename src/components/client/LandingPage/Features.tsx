"use client";
import { Bell, Calendar, FileText, Users } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { AnimatedSquareBackground } from "./Animation";
import { motion } from "framer-motion";
import Booking from "../../../assets/booking.png";
import Events from "../../../assets/events.png";
import Main from "../../../assets/main.png";
import Meeting from "../../../assets/meetings.png";

const animationVariants = {
  enterLeft: { opacity: 0, x: -100, transition: { duration: 5.0 } },
  enterRight: { opacity: 0, x: 100, transition: { duration: 5.0 } },
  enterTop: { opacity: 0, y: -100, transition: { duration: 5.0 } },
  enterBottom: { opacity: 0, y: 100, transition: { duration: 5.0 } },
  visible: { opacity: 1, x: 0, y: 0 },
};

const Features = () => {
  const [isWideScreen, setIsWideScreen] = useState<boolean>(false);
  const [isTallScreen, setIsTallScreen] = useState<boolean>(false);
  const [inView, setInView] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 800);
      setIsTallScreen(window.innerHeight > 800);
    };

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setInView(rect.top <= window.innerHeight && rect.bottom >= 0);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log("isWideScreen: ", isWideScreen);
  console.log("isTallScreen: ", isTallScreen);
  console.log("inView: ", inView);

  return (
    <div ref={sectionRef} className="relative">
      <h2 className="md:text-5xl text-2xl font-extrabold mb-10 text-white mt-10">
        Key Features
      </h2>
      <AnimatedSquareBackground />
      <div className="w-full h-max md:flex md:flex-row flex-col gap-5 mb-3">
        <motion.div
          className="md:w-1/2 w-full md:mb-5 mb-0"
          initial="enterLeft"
          animate={inView ? "visible" : "enterLeft"}
          variants={animationVariants}
        >
          <Image
            src={Main}
            alt="Image"
            height={300}
            width={300}
            className="rounded-lg shadow-2xl w-full h-full"
          />
        </motion.div>

        <div className="md:w-1/2 w-full flex flex-col md:gap-0 gap-3">
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg text-center flex md:w-1/2 w-full"
            initial="enterTop"
            animate={inView ? "visible" : "enterTop"}
            variants={animationVariants}
          >
            <div className="flex justify-center mb-4 flex-col">
              <Calendar className="w-8 h-8 mb-2 text-green-500" />
              <h3 className="text-xl font-semibold mb-2">
                Effortless Meeting Scheduling
              </h3>
              <p className="text-gray-300">
                Easily schedule one-on-one meetings with a simple, intuitive
                interface. Just pick a time, add your details, and send invites
                in seconds.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg text-center md:w-1/2 w-full flex items-end ml-auto"
            initial="enterBottom"
            animate={inView ? "visible" : "enterBottom"}
            variants={animationVariants}
          >
            <div className="flex justify-center mb-4 flex-col">
              <Users className="w-8 h-8 mb-2 text-green-500" />
              <h3 className="text-xl font-semibold mb-2">
                Seamless Calendar Integration
              </h3>
              <p className="text-gray-300">
                Connect your Google or Outlook calendar for automatic
                synchronization, ensuring no double bookings or missed
                appointments.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="w-full h-max md:flex md:flex-row  flex-col gap-3">
        <div className="md:w-1/2 w-full flex flex-col md:gap-0 gap-3">
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg text-center flex md:w-1/2 w-full"
            initial="enterLeft"
            animate={inView ? "visible" : "enterLeft"}
            variants={animationVariants}
          >
            <div className="flex justify-center mb-4 flex-col gap-3">
              <FileText className="w-8 h-8 mb-2 text-green-500" />
              <h3 className="text-xl font-semibold mb-2">
                Instant Video Conferencing Links
              </h3>
              <p className="text-gray-300">
                Automatically generate Google Meet or Zoom links for every
                meeting, so you and your invitee can join with a single click.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg text-center md:w-1/2 w-full flex items-end ml-auto"
            initial="enterRight"
            animate={inView ? "visible" : "enterRight"}
            variants={animationVariants}
          >
            <div className="flex justify-center mb-4 flex-col">
              <Bell className="w-8 h-8 mb-2 text-green-500" />
              <h3 className="text-xl font-semibold mb-2">
                Real-Time Notifications
              </h3>
              <p className="text-gray-300">
                Receive instant email confirmations and reminders, keeping both
                you and your invitee informed of upcoming meetings.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="md:w-1/2 w-full"
          initial="enterRight"
          animate={inView ? "visible" : "enterRight"}
          variants={animationVariants}
        >
          <Image
            src={Events}
            alt="Image"
            height={300}
            width={300}
            className="shadow-2xl w-full h-full"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
