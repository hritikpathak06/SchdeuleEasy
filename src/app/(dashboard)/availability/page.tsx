import { getUserAvailability } from "@/actions/availibility";
import AvailibilityForm from "@/components/client/Availability/AvailibilityForm";
import { defaultAvailability } from "@/lib/dummy";
import React from "react";

const page = async () => {
  const availibility = await getUserAvailability();

  console.log("Availibilty ===> ", availibility);

  return (
    <>
       <div>
      <h1 className=" text-white text-4xl font-bold mb-10">Your Availability</h1>
    </div>
      <div>
        <AvailibilityForm initialData = {availibility || defaultAvailability} />
      </div>
    </>
  );
};

export default page;
