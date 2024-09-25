"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import LOGO from "../Assets/LOGOS/logoMEA.png";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import OnScrollAnimation from "../Components/OnScrollAnimmation";
import GoogleTranslate from "../Components/gtranslate/gtrans";

export default function Header() {
  const [active, setActive] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (typeof document !== "undefined") {
      var hiddenElements1 = document.querySelectorAll(".hidden1");
      OnScrollAnimation(hiddenElements1);
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", isSticky);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", isSticky);
      }
    };
  });

  const isSticky = (e) => {
    const header = document.querySelector(".header-section");
    const scrollTop = window.scrollY;
    scrollTop >= 80
      ? header.classList.add("is-sticky")
      : header.classList.remove("is-sticky");
  };

  return (
    <div className="HeaderContainer shadow-lg w-full flex flex-col text-white bg-white">
      <div className="NavContainer hidden w-full h-[4.2vh] bg-[#c72626] justify-between justify-items-center items-center xl:flex ">
        <div className="flex justify-center pl-10">
          <h4 className="text-white text-[0.9rem] font-bold ">
            Welcome To Municipal Engineer Association
          </h4>
        </div>
        <div className="flex justify-end items-center pr-10 gap-5">
          <div className="flex justify-center gap-1">
            <div className="flex justify-center">
              <span className="p-1">
                <FaLocationDot />
              </span>
              <h5 className="text-white text-[0.8rem]"> example@gmail.com</h5>
            </div>
          </div>
          <div className="flex gap-1">
            <div className="flex justify-center">
              <span className="p-1 ">
                <IoCall />
              </span>
              <h5 className="text-white text-[0.8rem]">+ 91 242342523</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="HeaderContent h-[12vh] header-section w-[100%] bg-white flex justify-center items-center">
        <div className="flex w-[100%] bg-white justify-start justify-items-center h-[12vh]">
          <div className="flex">
            <Image
            alt="logo"
              src={LOGO}
              className="EMALOGOP ml-2"
              width={100}
              height={100}
            />
          </div>
          <div className="justify-center h-[12vh] sm:flex items-center gap-8 text-black w-[90%] text-[1rem] font-medium xl:flex">
            <Link href={"/"}>
              <h2 className="cursor-pointer hidden xl:flex">Home</h2>
            </Link>
            <div className="relative group h-13vh items-center hidden-xl">
              <h3 className="flex cursor-pointer hover-text-red items-center">
                About Us{" "}
                <span className="p-1">
                  <IoIosArrowDown />
                </span>
              </h3>
              <ul className="dropdown-menu">
                <li>
                  <Link href="background-of-mea" className="dropdown-link">
                    Background of MEA
                  </Link>
                </li>
                <li>
                  <Link href="#" className="dropdown-link">
                    Objectives
                  </Link>
                </li>
                <li>
                  <Link
                    href="recognition-and-affiliation"
                    className="dropdown-link"
                  >
                    Recognition and Affiliation
                  </Link>
                </li>
                <li>
                  <Link
                    href="distinguished-honorary-fellows"
                    className="dropdown-link"
                  >
                    Distinguished Honorary Fellows
                  </Link>
                </li>
              </ul>
            </div>
            <div className="relative group h-13vh items-center hidden-xl">
              <h3 className="flex cursor-pointer hover-text-red items-center">
                Members{" "}
                <span className="p-1">
                  <IoIosArrowDown />
                </span>
              </h3>
              <ul className="dropdown-menu">
                <li>
                  <Link href="/registered-members" className="dropdown-link">
                    Registered Members
                  </Link>
                </li>
              </ul>
            </div>
            <Link href={"/events"}>
              <h3 className="cursor-pointer hidden xl:flex">Events</h3>
            </Link>
            <Link href={"/gallery"}>
              <h3 className="cursor-pointer hidden xl:flex">Gallery</h3>
            </Link>
            <Link href={"/contact-us"}>
              <h3 className="cursor-pointer hidden xl:flex">Contact Us</h3>
            </Link>
            {session ? (
              // User is authenticated, show Profile link
              <Link href="/profile">
                <h3 className="cursor-pointer hidden xl:flex">Profile</h3>
              </Link>
            ) : (
              // User is not authenticated, show Member Registration link
              <Link href="/login">
                <h3 className="cursor-pointer hidden xl:flex">
                  Member Registration
                </h3>
              </Link>
            )}
            {session?.user?.role === "admin" ? (
              <Link href="/Admin">
                <h3 className="cursor-pointer hidden xl:flex">Admin</h3>
              </Link>
            ) : null}
            <div className="flex items-center justify-center">
              <GoogleTranslate />
            </div>
          </div>
        </div>
        <div
          className="HamBurgerIcon flex justify-center h-[13vh] justify-items-center pr-7 xl:hidden"
          onChange={() => setActive(!active)}
        >
          <label
            className="label flex h-[13vh] justify-center justify-items-center"
            htmlFor="check"
          >
            <input className="input" type="checkbox" id="check" />
            <span className="span"></span>
            <span className="span"></span>
            <span className="span"></span>
          </label>
        </div>
        <div className={active ? "Sub-SideNav-on-click" : "Sub-SideNav "}>
          <div className="menuItems">
            <Link href={"/"}>
              <h4>Home</h4>
            </Link>
            <div className="relative group items-center">
              <h3 className="flex cursor-pointer hover-text-red items-center">
                About Us{" "}
                <span className="p-1">
                  <IoIosArrowDown />
                </span>
              </h3>
              <ul className="dropdown-menu2">
                <li>
                  <Link href="background-of-mea" className="dropdown-link">
                    Background of MEA
                  </Link>
                </li>
                <li>
                  <Link href="objectives" className="dropdown-link">
                    Objectives
                  </Link>
                </li>
                <li>
                  <Link
                    href="recognition-and-affiliation"
                    className="dropdown-link"
                  >
                    Recognition and Affiliation
                  </Link>
                </li>
                <li>
                  <Link
                    href="distinguished-honorary-fellows"
                    className="dropdown-link"
                  >
                    Distinguished Honorary Fellows
                  </Link>
                </li>
                <li>
                  <Link href="#" className="dropdown-link">
                    Contributing in Science and Technology
                  </Link>
                </li>
                <li>
                  <Link href="#" className="dropdown-link">
                    Participation and Appreciation
                  </Link>
                </li>
              </ul>
            </div>
            <div className="relative group items-center">
              <h3 className="flex cursor-pointer hover-text-red items-center">
                Members{" "}
                <span className="p-1">
                  <IoIosArrowDown />
                </span>
              </h3>
              <ul className="dropdown-menu2">
                <li>
                  <Link href="background-of-mea" className="dropdown-link">
                    Background of MEA
                  </Link>
                </li>
                <li>
                  <Link href="objectives" className="dropdown-link">
                    Objectives
                  </Link>
                </li>
                <li>
                  <Link
                    href="recognition-and-affiliation"
                    className="dropdown-link"
                  >
                    Recognition and Affiliation
                  </Link>
                </li>
                <li>
                  <Link
                    href="distinguished-honorary-fellows"
                    className="dropdown-link"
                  >
                    Distinguished Honorary Fellows
                  </Link>
                </li>
                <li>
                  <Link href="#" className="dropdown-link">
                    Contributing in Science and Technology
                  </Link>
                </li>
                <li>
                  <Link href="#" className="dropdown-link">
                    Participation and Appreciation
                  </Link>
                </li>
              </ul>
            </div>
            <Link href={"/contact-us"}>
              <h4>Contact us</h4>
            </Link>
            <div className="flex">
              {session ? (
                <Link href="/profile">
                  <h3 className="cursor-pointer  xl:flex">Profile</h3>
                </Link>
              ) : (
                <Link href="/register">
                  <h3 className="cursor-pointer  xl:flex">
                    Member Registration
                  </h3>
                </Link>
              )}
            </div>
            <div className="w-full text-white z-20">
              {session?.user?.role === "admin" ? (
                <Link href="/Admin">
                  <h3 className="cursor-pointer  xl:flex">Admin</h3>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
