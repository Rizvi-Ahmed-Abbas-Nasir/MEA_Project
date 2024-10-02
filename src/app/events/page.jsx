"use client";

import { useEffect, useState } from "react";
import OnScrollAnimation from "../../Components/OnScrollAnimmation";
import Image from "next/image";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

export default function Page() {
  const [events, setEvents] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/admin/event`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch images.");
      }
      const result = await response.json();
      setEvents(result);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch images when the component mounts
  useEffect(() => {
    fetchImages();
  }, []);

  if (typeof document !== "undefined") {
    // Will run in client's browser only
    const hiddenElements1 = document.querySelectorAll(".hidden3");
    const hiddenElements4 = document.querySelectorAll(".hidden4");
    const hiddenElements2 = document.querySelectorAll(".hidden2");
    const hiddenElements3 = document.querySelectorAll(".hidden");

    OnScrollAnimation(hiddenElements1);
    OnScrollAnimation(hiddenElements4);
    OnScrollAnimation(hiddenElements2);
    OnScrollAnimation(hiddenElements3);
  }

  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col">
        <section className="h-44 bg-[#232323] flex justify-center items-center flex-col text-white">
          <h1 className="text-5xl p-3">Events</h1>
          <p className="text-lg p-3">Home / Events</p>
        </section>
        <section className="w-full flex flex-col items-center flex-grow">
  <div className="w-[90%] flex flex-col justify-start">
    <div className="w-full mt-10 "> {/* Change to w-full for full width */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl">Events</h1> {/* Responsive text sizes */}
    </div>
    <div className="w-full min-h-fit flex flex-wrap justify-center gap-6 md:gap-10 md:m-10"> {/* Center items and adjust gaps */}
      {events.map((event) => (
        <div
          key={event.eventId}
          className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-sm overflow-hidden shadow-lg cursor-pointer group hidden3"
        >
          <Image
            className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110"
            src={event.image}
            alt={event.title}
            width={400}
            height={300}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-white transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            <div className="text-center p-4">
              <p className="text-sm text-black mb-2">{event.date}</p>
              <h2 className="text-lg md:text-xl font-bold text-black"> {/* Responsive text size */}
                {event.title}
              </h2>
              <p className="text-base md:text-lg text-black"> {/* Responsive text size */}
                {event.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

        <Footer />
      </main>
    </>
  );
}
