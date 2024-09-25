import { UserButton } from "@clerk/nextjs";
import { BarChartIcon } from "@radix-ui/react-icons";
import React from "react";

const UserMenu = () => {
  return (
    <UserButton
      appearance={{
        elements: {
          avatarBox: "w-10 h-10",
        },
      }}
    >
      <UserButton.MenuItems>
        <UserButton.Link
          label="My Events"
          href="/events"
          labelIcon={<BarChartIcon className=" h-4 w-4" />}
        ></UserButton.Link>
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default UserMenu;
