"use client";
import React, { useEffect, useState } from "react";
import NAV from "../../Navbar";
import { useSession } from "next-auth/react";
import Unauthorized from "../../Unauthorized";

export default function Page() {
  const [replies, setReplies] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/admin/contact`,
          {
            method: "GET",
            headers: {
              authorization: process.env.NEXT_PUBLIC_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setReplies(data);
      } catch (error) {
        console.error("Error fetching replies:", error);
      }
    };

    fetchReplies();
  }, []);

  return (
    <>
      {session?.user?.role === "admin" ? (
        <div className="flex w-full h-screen flex-row">
          <NAV />
          <div className="flex flex-col w-full gap-6 h-screen items-center overflow-y-auto p-6 bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800">Replies</h1>
            <div className="w-full max-w-4xl space-y-4">
              {replies.map((reply) => (
                <div
                  key={reply.replyId}
                  className="bg-white shadow-md p-6 rounded-lg border border-gray-200"
                >
                  <p className="text-lg text-gray-700">
                    <strong className="font-semibold">Name:</strong>{" "}
                    {reply.fullName}
                  </p>
                  <p className="text-lg text-gray-700">
                    <strong className="font-semibold">Email:</strong>{" "}
                    {reply.email}
                  </p>
                  <p className="text-lg text-gray-700">
                    <strong className="font-semibold">Contact Number:</strong>{" "}
                    {reply.contactNumber}
                  </p>
                  <p className="text-lg text-gray-700">
                    <strong className="font-semibold">Address:</strong>{" "}
                    {reply.address}
                  </p>
                  <p className="text-lg text-gray-700">
                    <strong className="font-semibold">Message:</strong>{" "}
                    {reply.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Unauthorized />
      )}
    </>
  );
}
