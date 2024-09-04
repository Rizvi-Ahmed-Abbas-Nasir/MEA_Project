"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import NavHeaders from "./Header";

export default function NAV() {
  const { data: session } = useSession();
  return (
    <div className="w-[250px] h-screen shadow-lg bg-[#c72626] flex flex-col text-white">
      <div className="flex flex-col items-center py-6">
        <h1 className="text-xl font-semibold mb-6">Welcome, {session?.user.name}</h1>
        <NavHeaders/>
      </div>
    </div>
  );
}