"use client";
import React, { useEffect, useState } from "react";
import NAV from "../../Navbar";
import { useSession } from "next-auth/react";
import Unauthorized from "../../Unauthorized";

export default function Page() {
  const { data: session } = useSession();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/admin/members`,
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

  const deleteMember = async (memberId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/admin/members/edit/?id=${memberId}`,
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

      // Remove the deleted member from the state
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.memberId !== memberId)
      );
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  return (
    <>
      {session?.user?.role === "admin" ? (
        <div className="flex w-full h-screen flex-row">
          <NAV />
          <div className="flex flex-col w-full px-6 py-6 gap-6 h-screen overflow-y-auto bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800">Members</h1>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 text-left">
                    <th className="py-3 px-4 border-b">Name</th>
                    <th className="py-3 px-4 border-b">Email</th>
                    <th className="py-3 px-4 border-b">Contact Number</th>
                    <th className="py-3 px-4 border-b">Designation</th>
                    <th className="py-3 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member.memberId} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border-b">{member.fullName}</td>
                      <td className="py-2 px-4 border-b">{member.email}</td>
                      <td className="py-2 px-4 border-b">{member.contactNumber}</td>
                      <td className="py-2 px-4 border-b">{member.designation}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition duration-300 ease-in-out"
                          onClick={() => deleteMember(member.memberId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <Unauthorized />
      )}
    </>
  );
}
