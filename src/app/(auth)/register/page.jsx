"use client";
import OnScrollAnimation from "../../../Components/OnScrollAnimmation";
import { useEffect, useState, useRef } from "react";
import Footer from "../../../Components/Footer";
import Header from "../../../Components/Header";
import { useRouter } from "next/navigation";

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

  // New states for uploaded PDFs
  const [bmcLetter50, setDeclarationForm] = useState(null);
  const [bmcLetter, setBlankForm] = useState(null);
  const [isUploadComplete, setIsUploadComplete] = useState(false);

  const form = useRef();
  const router = useRouter();

  const ChangeName = (e) => {
    const Name = e.target.value;
    setName(Name);
    const reg = /^[a-zA-Z\s]+$/;

    if (reg.test(Name)) {
      setNameError("");
      setName(Name);
    } else if (!reg.test(Name)) {
      setNameError("Only Alphabets are Allowed");
    }
    if (Name.trim() === "") {
      setNameError("Name is Required");
    }
  };

  const ChangeEmail = (e) => {
    const Email = e.target.value;
    setEmail(Email);
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (reg.test(Email)) {
      setEmailError("");
      setEmail(Email);
    } else if (!reg.test(Email)) {
      setEmailError("Invalid Email Id");
    }
    if (Email.trim() === "") {
      setEmailError("Email is Required");
    }
  };

  const ChangeNumber = (e) => {
    const Number = e.target.value;
    setNumber(Number);
    const reg = /^\d{10}$/;

    if (reg.test(Number)) {
      setNumberError("");
      setNumber(Number);
    } else if (!reg.test(Number)) {
      setNumberError("Number should be 10 Digits");
    }
    if (Number.trim() === "") {
      setNumberError("Number is Required");
    }
  };

  const ChangeDeg = (e) => {
    const Deg = e.target.value;
    setDesignation(Deg);
    const reg = /^[a-zA-Z0-9]+$/;

    if (reg.test(Deg)) {
      setDegError("");
      setDesignation(Deg);
    }
    if (Deg.trim() === "") {
      setDegError("Designation is Required");
    }
  };
  const ChangeId =(e)=>{
    const Id = e.target.value;
    setEmployee_id(Id)
  }

  const ChangePass1 = (e) => {
    const Pass1 = e.target.value;
    setPassword(Pass1);
    const reg = /^[a-zA-Z0-9]+$/;

    if (reg.test(Pass1)) {
      setPass1rror("");
      setPassword(Pass1);
    }
    if (Pass1.trim() === "") {
      setPass1rror("Password is Required");
    }
  };

  const ChangePass2 = (e) => {
    const Pass2 = e.target.value;
    setConfirmPassword(Pass2);
    const reg = /^[a-zA-Z0-9]+$/;

    if (reg.test(Pass2)) {
      setPass2Error("");
      setConfirmPassword(Pass2);
    }
    if (Pass2.trim() === "") {
      setPass2Error("Password is Required");
    }
  };

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
      console.log(formData)
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
        setIsUploadComplete(false);
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

    // Check if both files are uploaded
    if (bmcLetter50 && bmcLetter) {
      setIsUploadComplete(true);
    }
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
      <Header />
      <main>
        <section className="h-44 bg-[#232323] flex justify-center items-center flex-col text-white">
          <h1 className="text-5xl p-3">Register</h1>
        </section>
        <section className="flex justify-center mt-7 mb-7 items-center min-h-screen hidden1 flex-col">
          <form onSubmit={handleSubmit} ref={form} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Member Register</h2>

            {/* Form fields */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={fullName}
                onChange={ChangeName}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C72625]"
                required
              />
              {nameError && <p className="text-red-500 mb-4">{nameError}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={ChangeEmail}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C72625]"
                required
              />
              {emailError && <p className="text-red-500 mb-4">{emailError}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Employee Code</label>
              <input
                type="number"
                name="employee_id"
                value={employee_id}
                onChange={ChangeId}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C72625]"
                required
              />
              {emailError && <p className="text-red-500 mb-4">{emailError}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Contact Number</label>
              <input
                type="number"
                name="contactNumber"
                value={contactNumber}
                onChange={ChangeNumber}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C72625]"
                required
              />
              {numberError && <p className="text-red-500 mb-4">{numberError}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Designation</label>
              <input
                type="text"
                name="designation"
                value={designation}
                onChange={ChangeDeg}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C72625]"
                required
              />
              {degError && <p className="text-red-500 mb-4">{degError}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={ChangePass1}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C72625]"
                required
              />
              {pass1Error && <p className="text-red-500 mb-4">{pass1Error}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={ChangePass2}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C72625]"
                required
              />
              {pass2Error && <p className="text-red-500 mb-4">{pass2Error}</p>}
            </div>

            {/* PDF download buttons */}
            <div className="mb-4">
            <label className="block text-gray-700 mb-2">Download This Form</label>
              <div className="flex justify-between">
                <a href="/assets/form/union_form.pdf" download className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                  Union form
                </a>
                
                <a href="/assets/form/union50_form.pdf" download className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                  Union 50 form
                </a>
              </div>
            </div>

            {/* File upload fields */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Upload Union Form</label>
              <input
                type="file"
                onChange={(e) => handleFileUpload(e, setBlankForm)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                accept=".pdf"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Upload Union 50 form</label>
              <input
                type="file"
                onChange={(e) => handleFileUpload(e, setDeclarationForm)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                accept=".pdf"
                required
              />
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-[#C72625]"
            >
              Register
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
