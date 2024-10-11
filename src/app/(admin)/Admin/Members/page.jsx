"use client";
import React, { useEffect, useState } from "react";
import NAV from "../../Navbar";
import { useSession } from "next-auth/react";
import Unauthorized from "../../Unauthorized";

export default function Page() {
  const { data: session } = useSession();
  const [members, setMembers] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(""); // State for the PDF URL
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [currentFileName, setCurrentFileName] = useState(""); // State for current file name

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
    const confirmDelete = window.confirm("Are you sure you want to delete this member?");
    if (!confirmDelete) return; // If the user cancels, exit the function
  
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
  
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.memberId !== memberId)
      );
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };
  

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
      setPdfUrl(url);
      setCurrentFileName(fileName); // Set current file name
      setIsModalOpen(true); // Open the modal
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPdfUrl(""); // Clear URL when closing
    setCurrentFileName(""); // Clear file name
    window.URL.revokeObjectURL(pdfUrl); // Clean up URL
  };

  return (
    <>
      <div className="flex w-full xl:flex-row flex-col">
        <NAV />
        <div className="flex  flex-col w-full px-6 py-6 gap-6 bg-gray-100 md:overflow-y-auto md:h-[100vh]">
          <h1 className="text-4xl font-bold text-gray-800">Members</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
              <thead className="bg-gray-200 sticky top-0">
                <tr className="text-gray-600 text-left">
                  <th className="py-3 px-4 border-b">Employee Code</th>
                  <th className="py-3 px-4 border-b">Full Name</th>
                  <th className="py-3 px-4 border-b">Email</th>
                  <th className="py-3 px-4 border-b">Contact Number</th>
                  <th className="py-3 px-4 border-b">Designation</th>
                  <th className="py-3 px-4 border-b">Role</th>
                  <th className="py-3 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {members.map((member, index) => (
                  <tr
                    key={member.memberId}
                    className={`hover:bg-gray-100 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="py-2 px-4 border-b">{member.employee_id}</td>
                    <td className="py-2 px-4 border-b">{member.fullName}</td>
                    <td className="py-2 px-4 border-b">{member.email}</td>
                    <td className="py-2 px-4 border-b">{member.contactNumber}</td>
                    <td className="py-2 px-4 border-b">{member.designation}</td>
                    <td className="py-2 px-4 border-b">{member.Role}</td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex gap-2">
                        <button
                          className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-300 ease-in-out"
                          onClick={() => handleFetchPdf(member.bmcLetter, "form_empty")}
                        >
                          Preview BMC Letter
                        </button>
                        <button
                          className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-300 ease-in-out"
                          onClick={() => handleFetchPdf(member.bmcLetter50, "form_50")}
                        >
                          Preview BMC Letter 50
                        </button>
                        <button
                          className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition duration-300 ease-in-out"
                          onClick={() => deleteMember(member.memberId)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for PDF Preview */}
        {isModalOpen && pdfUrl && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-4 w-11/12 md:w-3/4 lg:w-1/2 shadow-lg">
              <h2 className="text-lg font-bold mb-2">Preview: {currentFileName}</h2>
              <iframe
                src={pdfUrl}
                width="100%"
                height="500px"
                title="PDF Preview"
                className="border border-gray-200"
              />
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
