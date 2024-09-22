"use client";
import React, { useEffect, useState } from "react";
import NAV from "../../Navbar";
import { useSession } from "next-auth/react";
import Unauthorized from "../../Unauthorized";

export default function Page() {
  const [members, setMembers] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/admin`,
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
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  const handleAccept = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/admin/members?id=${id}`,
        {
          method: "POST",
          headers: {
            authorization: process.env.NEXT_PUBLIC_API_KEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      } else {
        handleDecline(id);
      }

      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== id)
      );
    } catch (error) {
      console.error("Error accepting member:", error);
    }
  };

  const handleDecline = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/admin/members?id=${id}`,
        {
          method: "DELETE",
          headers: {
            authorization: process.env.NEXT_PUBLIC_API_KEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== id)
      );
    } catch (error) {
      console.error("Error declining member:", error);
    }
  };

  return (
    <>
      {session?.user?.role === "admin" ? (
        <div className="flex w-full h-screen flex-row text-xl bg-gray-100">
          <NAV />
          <div className="flex flex-col w-full gap-8 px-8 py-6 h-screen overflow-y-auto">
            <h1 className="text-3xl font-bold text-gray-800 text-center">
              Requested Members List
            </h1>
            {members.length === 0 ? (
              <p className="text-gray-600 text-lg">No members found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 text-left">
                      <th className="py-3 px-4 border-b">Name</th>
                      <th className="py-3 px-4 border-b">ID</th>
                      <th className="py-3 px-4 border-b">Email</th>
                      <th className="py-3 px-4 border-b">Contact Number</th>
                      <th className="py-3 px-4 border-b">Designation</th>
                      <th className="py-3 px-4 border-b">Role</th>
                      <th className="py-3 px-4 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member) => (
                      <tr key={member.id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border-b">{member.fullName}</td>
                        <td className="py-2 px-4 border-b">{member.id}</td>
                        <td className="py-2 px-4 border-b">{member.email}</td>
                        <td className="py-2 px-4 border-b">{member.contactNumber}</td>
                        <td className="py-2 px-4 border-b">{member.designation}</td>
                        <td className="py-2 px-4 border-b">{member.Role}</td>
                        <td className="py-2 px-4 border-b">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAccept(member.id)}
                              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition duration-300 ease-in-out"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleDecline(member.id)}
                              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition duration-300 ease-in-out"
                            >
                              Decline
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Unauthorized />
      )}
    </>
  );
}
