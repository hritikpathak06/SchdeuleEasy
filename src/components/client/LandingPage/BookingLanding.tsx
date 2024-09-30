import React from 'react';
import BookingImage from "../../../assets/booking.png"; // Ensure the path is correct
import Image from 'next/image';

const BookingLanding = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Create Your Own Scheduler Now
          </h1>
          <p className="text-lg text-gray-600">
            Seamlessly manage your meetings with our easy-to-use scheduler tool. 
            Simplify your workflow and never miss a meeting again!
          </p>
        </div>
        <div className="relative w-full max-w-4xl">
          <Image
            src={BookingImage} 
            alt="Booking Scheduler" 
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>
        <button className="mt-8 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-md hover:bg-blue-500 transition duration-300">
          Get Started
        </button>
      </div>
    </>
  );
}

export default BookingLanding;
