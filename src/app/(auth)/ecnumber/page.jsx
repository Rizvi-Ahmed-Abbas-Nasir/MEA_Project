"use client"
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
      console.log(data)
      if (data.message == "true") {
        // Navigate to the register page if the employee code is valid
        router.push("/register");
      } else {
        setError("Invalid Employee Code");
      }
    } catch (error) {
      setError("Failed to validate the employee code. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <section className="h-44 bg-[#232323] flex justify-center items-center flex-col text-white">
        <h1 className="text-5xl p-3">Employee Number</h1>
      </section>
      <section className="flex justify-center items-center h-[50vh] flex-col">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Employee Code</label>
            <input
              type="text"
              value={employee_id}
              onChange={(e) => setEmployeeCode(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C72625]"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-[#C72625]">
            Submit
          </button>
        </form>
      </section>
      <Footer />
    </>
  );
}

export default Page;
