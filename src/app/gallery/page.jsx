"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

export default function Page() {
  const [events, setEvents] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/gallery`);
      if (!response.ok) {
        throw new Error("Failed to fetch images.");
      }
      const result = await response.json();
      setEvents(result);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Fetch images when the component mounts
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col">
        <section className="h-44 bg-[#232323] flex justify-center items-center flex-col text-white">
          <h1 className="text-5xl p-3">Gallery</h1>
          <p className="text-lg p-3">Home / Gallery</p>
        </section>
        <section className="w-full flex flex-col items-center flex-grow">
          <div className="w-[90%] flex flex-col">
            <div className="w-[90%] mt-10">
              <h1 className="text-[2.5rem]">Gallery</h1>
            </div>
            <div className=" flex flex-wrap m-10 gap-10">
              {events.map((gallery) => (
                <div
                  key={gallery.imageId}
                  className="relative w-full max-w-sm overflow-hidden shadow-lg cursor-pointer group"
                >
                  <Image
                    className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110"
                    src={gallery.image}
                    alt={gallery.title}
                    width={400}
                    height={300}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
