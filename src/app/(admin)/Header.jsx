"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaHome, FaUser, FaClipboard, FaCalendar, FaImages, FaAward } from "react-icons/fa";

const AdminHeader = () => {
  const [activeMenu, setActiveMenu] = useState(false);

  // Toggle the hamburger menu
  const toggleMenu = () => {
    setActiveMenu(!activeMenu);
  };

  return (
    <div className="h-[100vh] w-full bg-red-900 text-white">
      {/* Sidebar */}
      <div className="xl:w-[100%] h-full bg-red-800  flex-col hidden xl:flex" >
        {/* <div className="flex items-center justify-center h-20 border-b border-gray-700">
          <div className="text-center">
            <img
              src="/path-to-avatar.jpg"
              alt="Avatar"
              className="w-12 h-12 rounded-full mx-auto"
            />
            <h2 className="text-lg font-semibold">Zack Foster</h2>
            <span className="text-sm text-gray-400">Super Admin</span>
          </div>
        </div> */}

        <nav className="flex-grow px-4 py-6">
          <ul className="space-y-2 mt-4">
            <li>
              <Link href="/" className="flex items-center p-2 rounded-lg hover:bg-red-700">
                <FaHome className="mr-2" />
                <span className="font-medium">Home</span>
              </Link>
            </li>
            <li>
              <Link href="/Admin/Members" className="flex items-center p-2 rounded-lg hover:bg-red-700">
                <FaClipboard className="mr-2" />
                <span className="font-medium">Members</span>
              </Link>
            </li>
            <li className="relative">
              <Link href="/Admin/member_req" className="flex items-center p-2 rounded-lg hover:bg-red-700">
                <FaUser className="mr-2" />
                <span className="font-medium">Member's Request</span>
              </Link>
            </li>
            <li>
              <Link href="/Admin/replies" className="flex items-center p-2 rounded-lg hover:bg-red-700">
                <FaUser className="mr-2" />
                <span className="font-medium">Replies</span>
              </Link>
            </li>
            <li>
              <Link href="/Admin/Events" className="flex items-center p-2 rounded-lg  hover:bg-red-600">
                <FaCalendar className="mr-2" />
                <span className="font-medium">Event</span>
              </Link>
            </li>
          </ul>          <ul className="space-y-2 mt-2">
            <li>
              <Link href="/Admin/gallery" className="flex items-center p-2 rounded-lg hover:bg-red-700">
                <FaClipboard className="mr-2" />
                <span className="font-medium">Gallery</span>
              </Link>
            </li>
            <li>
              <Link href="/Admin/honorory" className="flex items-center p-2 rounded-lg hover:bg-red-700">
                <FaClipboard className="mr-2" />
                <span className="font-medium">Honorary Members</span>
              </Link>
            </li>
            
          </ul>
        </nav>
        
      </div>
    {/* Hamburger Menu */}
    <div className="relative flex items-center h-[10vh] justify-center w-full z-50  lg:hidden">
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
<div
  className={`lg:hidden absolute  left-0 transition-all duration-500 overflow-hidden ${activeMenu ? 'max-h-[400px] mb-4' : 'max-h-0'} w-full`}
  style={{ transitionTimingFunction: 'ease-in-out', zIndex: 40 }} // Adjust z-index for the menu
>
  <nav className="flex flex-col items-center bg-red-900 w-full">
    <ul className="flex flex-col items-center gap-4 py-4">
      <li>
        <Link href="/"> {/* Add the correct href */}
          Home
        </Link>
      </li>
      <li>
        <Link href="/Admin/Members"> {/* Add the correct href */}
          Members
        </Link>
      </li>
      <li>
        <Link href="/Admin/member_req"> {/* Add the correct href */}
          Members Request's
        </Link>
      </li>
      <li>
        <Link href="/Admin/replies"> {/* Add the correct href */}
          Replies
        </Link>
      </li>
      <li>
        <Link href="/Admin/Events"> {/* Add the correct href */}
          Events
        </Link>
      </li>
      <li>
        <Link href="/Admin/gallery"> {/* Existing href */}
          Gallery
        </Link>
      </li>
      <li>
        <Link href="/Admin/honorory"> {/* Existing href */}
          Honorory
        </Link>
      </li>
    </ul>
  </nav>
</div>




    </div>
  );
};

export default AdminHeader;
