
import { checkUser } from "@/lib/checkUser";
import React from "react";

const Footer = async() => {
  await checkUser()

  return (
    <div className=" bg-blue-300 py-12">
      <div className=" container mx-auto px-4 text-center text-gray-600">
        <h1>All Copyrights reserved @scheduleeasy.com</h1>
      </div>
    </div>
  );
};

export default Footer;
