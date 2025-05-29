"use client"

import React, { useState } from "react";
import Image from "next/image";
import { FaArrowLeft, FaExclamationCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

export function RegisterPage() {
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameError("");
    setEmailError("");  
    setPasswordError("");
    setServerError("");

    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    // const role = "masyarakat";

    let isValid = true;

    if (!name) {
      setNameError("Name is required");
      isValid = false;
    }
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }

    if (!isValid) return;

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password})
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.message?.includes("exists")) {
          setEmailError("Email is already registered");
        } else {
          setServerError(data.message || "Something went wrong");
        }
        return;
      }

      // Redirect to landing page if success
      router.push("/homePage");
    } catch (error) {
      setServerError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-auto w-full">
      {/* Left Side */}
      <div className="w-full md:w-1/2 relative flex items-center justify-center bg-gray-100 h-64 md:h-screen">
        <Image
          src="/background.svg"
          width={500}
          height={500}
          alt="Financial discussion"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="flex flex-col justify-between md:flex-row z-10 h-full py-7 px-7">
          <div className="w-full md:w-2/4 flex items-start justify-start">
            <button 
              onClick={() => router.back()}
              className="text-white font-jakarta font-medium text-lg flex items-center"   
            >
              <FaArrowLeft className="mr-2" />
              Kembali
            </button>
          </div>
          <div className="w-full md:w-3/6 flex items-end justify-end text-white text-3xl font-inter font-bold text-end">
            <p>No More Hidden Numbers. Just Real Transparency.</p>
          </div>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-10">
        <div className="w-full max-w-md bg-white p-8 rounded-lg">
          <h2 className="text-3xl font-bold font-jakarta text-center mb-4">Get Started Now!</h2>
          <p className="text-[#697586] font-jakarta font-normal text-base text-center mb-6">
            Enter your data to create your account
          </p>

          {serverError && (
            <div className="text-red-500 text-sm mb-4 flex items-center">
              <FaExclamationCircle className="mr-2" />
              {serverError}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-[#011829] font-medium text-sm">Name</label>
              <input
                type="text"
                name="name"
                className={`w-full p-2 border rounded-md mt-1 ${nameError ? 'border-red-500' : ''}`}
                placeholder="fatimah alaydrus"
              />
              {nameError && (
                <div className="flex items-center text-red-500 mt-1">
                  <FaExclamationCircle className="mr-1" />
                  <span className="text-sm">{nameError}</span>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-[#011829] font-medium text-sm">Email</label>
              <input
                type="email"
                name="email"
                className={`w-full p-2 border rounded-md mt-1 ${emailError ? 'border-red-500' : ''}`}
                placeholder="fatimah@badr.co.id"
              />
              {emailError && (
                <div className="flex items-center text-red-500 mt-1">
                  <FaExclamationCircle className="mr-1" />
                  <span className="text-sm">{emailError}</span>
                </div>
              )}
            </div>

            <div className="mb-4 relative">
              <label className="block text-[#011829] font-medium text-sm">Password</label>
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                className={`w-full p-2 border rounded-md mt-1 ${passwordError ? 'border-red-500' : ''}`}
              />
              <button
                type="button"
                className="absolute inset-y-11 right-0 pr-3 flex items-center text-gray-600"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
              {passwordError && (
                <div className="flex items-center text-red-500 mt-1">
                  <FaExclamationCircle className="mr-1" />
                  <span className="text-sm">{passwordError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#1877AA] text-white py-2 font-inter text-sm rounded-md hover:bg-blue-700"
            >
              Sign Up
            </button>
          </form>

          <div className="flex items-center my-4 mx-9">
            <div className="flex-grow border-t border-black"></div>
            <span className="mx-4 text-black font-inter font-medium text-sm">or</span>
            <div className="flex-grow border-t border-black"></div>
          </div>

          <button className="w-full bg-[#D1E0FF] border-[#0479CE] border-2 text-[#00359E] font-inter font-medium text-sm py-2 rounded-md hover:bg-blue-300">
            Using ID for Government and Verificator
          </button>

          <p className="text-center text-black font-jakarta font-bold mt-4 text-sm">
            Have an Account already?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-[#0040C1] cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
