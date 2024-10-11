"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaHome, FaUser, FaClipboard, FaCalendar } from "react-icons/fa";

const AdminHeader = () => {
  const [activeMenu, setActiveMenu] = useState(false);

  // Toggle the hamburger menu
  const toggleMenu = () => {
    setActiveMenu((prevState) => !prevState);
  };

  return (
    <div className=" w-full bg-red-900 text-white">
      {/* Sidebar */}
      <div className="xl:w-[100%] h-full bg-red-800 flex-col hidden xl:flex">
  <nav className="flex-grow px-4 py-6">
    <ul className="space-y-2 mt-4">
      <li>
        <Link href="/" className="flex items-center p-2 rounded-lg hover:bg-red-700">
          <FaHome className="mr-2" />
          <span className="font-medium text-sm md:text-[.6rem] lg:text-lg xl:text-xl whitespace-nowrap">HomePage</span>
        </Link>
      </li>
      <li>
        <Link href="/Admin/Members" className="flex items-center p-2 rounded-lg hover:bg-red-700">
          <FaClipboard className="mr-2" />
          <span className="font-medium text-sm md:text-base lg:text-lg xl:text-xl whitespace-nowrap">Members</span>
        </Link>
      </li>
      <li>
        <Link href="/Admin/member_req" className="flex items-center p-2 rounded-lg hover:bg-red-700">
          <FaUser className="mr-2" />
          <span className="font-medium text-sm md:text-[.6rem] lg:text-lg xl:text-xl whitespace-nowrap">Member's Request</span>
        </Link>
      </li>
      <li>
        <Link href="/Admin/replies" className="flex items-center p-2 rounded-lg hover:bg-red-700">
          <FaUser className="mr-2" />
          <span className="font-medium text-sm md:text-base lg:text-lg xl:text-xl whitespace-nowrap">Replies</span>
        </Link>
      </li>
      <li>
        <Link href="/Admin/Events" className="flex items-center p-2 rounded-lg hover:bg-red-600">
          <FaCalendar className="mr-2" />
          <span className="font-medium text-sm md:text-base lg:text-lg xl:text-xl whitespace-nowrap">Event</span>
        </Link>
      </li>
      <li>
        <Link href="/Admin/gallery" className="flex items-center p-2 rounded-lg hover:bg-red-700">
          <FaClipboard className="mr-2" />
          <span className="font-medium text-sm md:text-base lg:text-lg xl:text-xl whitespace-nowrap">Gallery</span>
        </Link>
      </li>
      <li>
        <Link href="/Admin/honorory" className="flex items-center p-2 rounded-lg hover:bg-red-700">
          <FaClipboard className="mr-2" />
          <span className="font-medium text-sm md:text-base lg:text-lg xl:text-xl whitespace-nowrap">Honorary Members</span>
        </Link>
      </li>
    </ul>
  </nav>
</div>


      {/* Hamburger Menu */}
      <div className="relative flex items-center h-[10vh] justify-center w-full z-50 lg:hidden">
        <div className="flex flex-col justify-center items-center cursor-pointer" onClick={toggleMenu}>
          <div
            className={`w-8 h-1 bg-white mb-1 transition-all duration-300 ${activeMenu ? 'rotate-45 translate-y-2' : ''}`}
          ></div>
          <div
            className={`w-8 h-1 bg-white mb-1 transition-all duration-300 ${activeMenu ? 'opacity-0' : ''}`}
          ></div>
          <div
            className={`w-8 h-1 bg-white transition-all duration-300 ${activeMenu ? '-rotate-45 -translate-y-2' : ''}`}
          ></div>
        </div>
      </div>

      {/* Mobile Menu */}
      {activeMenu && (
        <div className="lg:hidden absolute left-0 w-full bg-red-900 z-40">
          <nav className="flex flex-col items-center">
            <ul className="flex flex-col items-center gap-4 py-4">
              <li>
                <Link href="/" className="text-sm md:text-base lg:text-lg xl:text-xl">
                  HomePage
                </Link>
              </li>
              <li>
                <Link href="/Admin/Members" className="text-sm md:text-base lg:text-lg xl:text-xl">
                  Members
                </Link>
              </li>
              <li>
                <Link href="/Admin/member_req" className="text-sm md:text-base lg:text-lg xl:text-xl">
                  Member's Request
                </Link>
              </li>
              <li>
                <Link href="/Admin/replies" className="text-sm md:text-base lg:text-lg xl:text-xl">
                  Replies
                </Link>
              </li>
              <li>
                <Link href="/Admin/Events" className="text-sm md:text-base lg:text-lg xl:text-xl">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/Admin/gallery" className="text-sm md:text-base lg:text-lg xl:text-xl">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/Admin/honorory" className="text-sm md:text-base lg:text-lg xl:text-xl">
                  Honorary Members
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default AdminHeader;
