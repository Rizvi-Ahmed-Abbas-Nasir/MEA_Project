"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import NavHeaders from "./Header";

export default function NAV() {
  const { data: session } = useSession();
  return (
    <div className="flex-shrink-0 xl:w-[15%] w-full bg-red-700 text-white h-[10vh]  xl:h-screen shadow-lg   flex-col ">
      {/* <div className="flex flex-col items-center py-6"> */}
        {/* <h1 className="text-xl font-semibold mb-6">Welcome, {session?.user.name}</h1> */}
        <NavHeaders />
      </div>
    // </div>
  );
}
