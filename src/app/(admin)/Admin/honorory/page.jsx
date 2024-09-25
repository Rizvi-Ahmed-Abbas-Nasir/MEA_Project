"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Unauthorized from "../../Unauthorized";
import NAV from "../../Navbar";

export default function HonoraryManagementPage() {
  const { data: session } = useSession();
  const [honoraryList, setHonoraryList] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  // Fetch honorary members
  const fetchHonoraryMembers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/admin/honorary`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch honorary members.");
      }
      const result = await response.json();
      setHonoraryList(result);
    } catch (error) {
      setStatusMessage(error.message);
    }
  };

  // Fetch honorary members when component mounts
  useEffect(() => {
    fetchHonoraryMembers();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const honoraryData = { name, role };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/admin/honorary`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: process.env.NEXT_PUBLIC_API_KEY,
          },
          body: JSON.stringify(honoraryData),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to add honorary member.");
      }

      setStatusMessage("Honorary member added successfully.");
      setName("");
      setRole("");

      // Refresh honorary members list
      await fetchHonoraryMembers();
    } catch (error) {
      setStatusMessage(error.message);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/admin/honorary?id=${id}`,
        {
          method: "DELETE",
          headers: {
            authorization: process.env.NEXT_PUBLIC_API_KEY,
          },
        }
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to delete honorary member.");
      }

      setStatusMessage("Honorary member deleted successfully.");
      // Refresh honorary members list
      await fetchHonoraryMembers();
    } catch (error) {
      setStatusMessage(error.message);
    }
  };
  if (session?.user?.role !== "admin") {
    return <Unauthorized />;
  }

  return (
    <div className="flex w-full h-screen flex-row text-xl bg-gray-100">
      <NAV />
      <div className="flex flex-col w-full gap-8 px-8 py-6 h-screen overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4">Honorary Management</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Add Honorary Member</h2>
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Role:
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          >
            Add Honorary
          </button>
        </form>
        {statusMessage && (
          <p
            className={`mb-4 text-sm ${
              statusMessage.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {statusMessage}
          </p>
        )}
        <h2 className="text-2xl font-semibold mb-4">
          Existing Honorary Members
        </h2>
        {honoraryList.length > 0 ? (
          <ul className="bg-white shadow-md rounded-lg p-6">
            {honoraryList.map((member) => (
              <li
                key={member.honoraryId}
                className="flex justify-between items-center mb-4 p-2 border-b"
              >
                <span className="text-lg font-medium">
                  {member.name} - {member.role}
                </span>
                <button
                  onClick={() => handleDelete(member.honoraryId)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No honorary members available.</p>
        )}
      </div>
    </div>
  );
}
