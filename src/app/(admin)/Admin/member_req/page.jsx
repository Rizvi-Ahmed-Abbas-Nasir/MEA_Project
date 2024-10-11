"use client";
import React, { useEffect, useState } from "react";
import NAV from "../../Navbar";
import { useSession } from "next-auth/react";
import Unauthorized from "../../Unauthorized";

export default function Page() {
  const [members, setMembers] = useState([]);
  const { data: session } = useSession();
  const [pdfFiles, setPdfFiles] = useState({});

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

  const handleFetchPdf = async (fileName, formType) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getFile`, {
        method: "GET",
        headers: {
          authorization: process.env.NEXT_PUBLIC_API_KEY,
          fileName,
          formType,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      setTimeout(() => window.URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };
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
    <div className="flex w-full flex-col xl:flex-row">
      <NAV />
      <div className="flex  flex-col w-full px-4 sm:px-6 py-4 sm:py-6 gap-6 bg-gray-100 md:overflow-y-auto md:h-[100vh]">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center">
          Requested Members List
        </h1>
        {members.length === 0 ? (
          <p className="text-gray-600 text-lg text-center">No members found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-gray-50 sticky top-0">
                <tr className="text-gray-700 text-left uppercase text-sm leading-normal">
                  <th className="py-3 px-2 sm:px-4 border-b">EC</th>
                  <th className="py-3 px-2 sm:px-4 border-b">Name</th>
                  <th className="py-3 px-2 sm:px-4 border-b">Email</th>
                  <th className="py-3 px-2 sm:px-4 border-b">Contact Number</th>
                  <th className="py-3 px-2 sm:px-4 border-b">Designation</th>
                  <th className="py-3 px-2 sm:px-4 border-b">Role</th>
                  <th className="py-3 px-2 sm:px-4 border-b">Preview Files</th>
                  <th className="py-3 px-2 sm:px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {members.map((member, index) => (
                  <tr key={member.id} className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="py-3 px-2 sm:px-4 border-b">{member.employee_id}</td>
                    <td className="py-3 px-2 sm:px-4 border-b">{member.fullName}</td>
                    <td className="py-3 px-2 sm:px-4 border-b">{member.email}</td>
                    <td className="py-3 px-2 sm:px-4 border-b">{member.contactNumber}</td>
                    <td className="py-3 px-2 sm:px-4 border-b">{member.designation}</td>
                    <td className="py-3 px-2 sm:px-4 border-b">{member.Role}</td>

                    <td className="py-3 px-2 sm:px-4 border-b">
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleFetchPdf(member.bmcLetter, "form_empty", member.id)}
                          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center gap-2 text-sm sm:text-base"
                        >
                          <i className="fas fa-file-pdf"></i> BMC Letter
                        </button>

                        <button
                          onClick={() => handleFetchPdf(member.bmcLetter50, "form_50", member.id)}
                          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center gap-2 text-sm sm:text-base"
                        >
                          <i className="fas fa-file-pdf"></i> BMC 50 Letter
                        </button>
                      </div>
                    </td>

                    <td className="py-3 px-2 sm:px-4 border-b">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => handleAccept(member.id)}
                          className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded flex items-center gap-2 text-sm sm:text-base transition duration-300 ease-in-out"
                        >
                          <i className="fas fa-check"></i> Accept
                        </button>
                        <button
                          onClick={() => handleDecline(member.id)}
                          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded flex items-center gap-2 text-sm sm:text-base transition duration-300 ease-in-out"
                        >
                          <i className="fas fa-times"></i> Decline
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
  </>
  );
}
