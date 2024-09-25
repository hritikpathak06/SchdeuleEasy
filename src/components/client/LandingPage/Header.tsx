"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../../assets/logo.png";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import UserMenu from "../Shared/UserMenu";

const Header = () => {
  return (
    <>
      <nav className="mx-auto py-2 px-4 flex justify-between shadow-amber-500 shadow-lg border-b-2">
        <Link href={"/"} className=" flex items-center">
          <Image src={Logo} height={100} width={100} alt="logo" />
        </Link>
        <div className=" flex items-center gap-3">
          <Link href={`/events?create=true`}>
            <Button className=" flex items-center gap-2">
              <PlusIcon className=" h-4 w-4" />
              Create Event
            </Button>
          </Link>
          <SignedOut>
            <SignInButton forceRedirectUrl={"/dashboard"}>
              <Button variant={"outline"}>Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserMenu />
          </SignedIn>
        </div>
      </nav>
    </>
  );
};

export default Header;
