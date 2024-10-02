"use client";
import OnScrollAnimation from "../../../Components/OnScrollAnimmation";
import { useEffect, useState, useRef } from "react";
import Footer from "../../../Components/Footer";
import Header from "../../../Components/Header";
import { useRouter, useSearchParams } from "next/navigation";

export default function RegisterForm() {
  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [employee_id, setEmployee_id] = useState("");
  const [contactNumber, setNumber] = useState("");
  const [designation, setDesignation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [degError, setDegError] = useState("");
  const [pass2Error, setPass2Error] = useState("");
  const [pass1Error, setPass1rror] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  // New states for uploaded PDFs
  const [bmcLetter50, setDeclarationForm] = useState(null);
  const [bmcLetter, setBlankForm] = useState(null);

  const form = useRef();
  const router = useRouter();
  const searchParams = useSearchParams();

  const ec = searchParams.get("ec");
  useEffect(() => {
    const validateEmployeeId = async () => {
      try {
        const res = await fetch("/api/validateMember", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ employee_id: ec }),
        });

        const data = await res.json();
        if (data.message == "true") {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        setError("Failed to validate the employee code. Please try again.");
        setIsAuthorized(false);
      }
    };

    if (ec) {
      validateEmployeeId();
    } else {
      setIsAuthorized(false);
    }
  }, [ec]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!bmcLetter50 || !bmcLetter) {
      setError("Please upload both the Declaration and Blank forms.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const isEmployeeIdValid = await validateEmployeeId();
    if (!isEmployeeIdValid) {
      return; // Exit if employee code is invalid
    }

    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("employee_id", employee_id);
      formData.append("contactNumber", contactNumber);
      formData.append("designation", designation);
      formData.append("password", password);
      formData.append("bmcLetter50", bmcLetter50);
      formData.append("bmcLetter", bmcLetter);

      const res = await fetch("/api/memberReg", {
        method: "POST",
        body: formData,
        headers: {
          authorization: process.env.NEXT_PUBLIC_API_KEY,
        },
      });

      if (res.ok) {
        // Reset form on successful registration
        setName("");
        setEmail("");
        setEmployee_id("");
        setNumber("");
        setDesignation("");
        setPassword("");
        setConfirmPassword("");
        setDeclarationForm(null);
        setBlankForm(null);
        alert("Register successful, wait till admin accept your request");
        router.push("/login");
      } else {
        const data = await res.json();
        setError(data.message);
      }
    } catch (error) {
      setError("Failed to submit the form. Please try again.");
    }
  };

  const handleFileUpload = (e, setFile) => {
    const file = e.target.files[0];
    setFile(file);
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      const hiddenElements1 = document.querySelectorAll(".hidden3");
      const hiddenElements4 = document.querySelectorAll(".hidden4");
      const hiddenElements2 = document.querySelectorAll(".hidden2");
      const hiddenElements3 = document.querySelectorAll(".hidden1");

      OnScrollAnimation(hiddenElements1);
      OnScrollAnimation(hiddenElements4);
      OnScrollAnimation(hiddenElements2);
      OnScrollAnimation(hiddenElements3);
    }
  }, []);

  return (
    <>
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-300">
      <Header />
      {isAuthorized ? (
        <div className="h-[160vh] flex flex-col bg-gradient-to-br from-gray-100 to-gray-300">
          <div className="flex h-[100vh] flex-col justify-center items-center flex-grow">
            <div className="relative bg-white p-10 rounded-xl shadow-lg w-[50%]"> {/* Increased max-w-md to max-w-lg */}
              {/* Profile icon */}
              <div className="absolute top-[-50px] left-[50%] translate-x-[-50%] bg-gradient-to-br from-[red] to-[red] w-20 h-20 rounded-full flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 110-12 6 6 0 010 12zM7 10a3 3 0 116 0 3 3 0 01-6 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
  
              {/* Form */}
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Member Register</h2>
              <form onSubmit={handleSubmit} ref={form}>
                {/* Grouped Inputs */}
                <div className="mb-4 flex gap-4"> {/* Flex container with gap between inputs */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-600 mb-2">First Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={fullName}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
               
                </div>
  
                {/* Email Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                  {emailError && <p className="text-red-500 mb-4">{emailError}</p>}
                </div>
  
                {/* Employee Code and Contact Number Side by Side */}
                <div className="mb-4 flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Employee Code</label>
                    <input
                      type="text"
                      name="employee_id"
                      value={employee_id}
                      onChange={(e) => setEmployee_id(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Contact Number</label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={contactNumber}
                      onChange={(e) => setNumber(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                    {numberError && <p className="text-red-500 mb-4">{numberError}</p>}
                  </div>
                </div>
  
                {/* Other Form Fields */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Designation</label>
                  <input
                    type="text"
                    name="designation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                  {degError && <p className="text-red-500 mb-4">{degError}</p>}
                </div>
  
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                  {pass1Error && <p className="text-red-500 mb-4">{pass1Error}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                  {pass2Error && <p className="text-red-500 mb-4">{pass2Error}</p>}
                </div>
  
                {/* File Upload Section */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Declaration Form</label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e, setDeclarationForm)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Blank Form</label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e, setBlankForm)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
  
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
  
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <p className="text-lg text-gray-800">Unauthorized Access. Please check your employee code.</p>
        </div>
      )}
      <Footer />
    </div>
  </>
  
  );
}
