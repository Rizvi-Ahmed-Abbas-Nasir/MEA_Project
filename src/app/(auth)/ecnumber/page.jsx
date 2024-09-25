"use client";
import React, { useState } from "react";
import Footer from "../../../Components/Footer";
import Header from "../../../Components/Header";
import { useRouter } from "next/navigation";

function Page() {
  const [employee_id, setEmployeeCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/validateMember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employee_id }),
      });

      const data = await res.json();
      if (data.message === "true") {
        // Navigate to the register page if the employee code is valid
        router.push(`/register?ec=${employee_id}`);
      } else {
        setError("Invalid Employee Code");
      }
    } catch (error) {
      setError("Failed to validate the employee code. Please try again.");
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-300">
        <Header />
        <section className="flex flex-col items-center justify-center py-12 flex-grow bg-gradient-to-br from-gray-100 to-gray-300">
          <div className="relative bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
            {/* Title */}
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Employee Code</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Enter Your Employee Code</label>
                <input
                  type="text"
                  value={employee_id}
                  onChange={(e) => setEmployeeCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150"
              >
                Submit
              </button>
            </form>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default Page;
