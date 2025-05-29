"use client"

import React, { useState } from "react";
import Image from "next/image";
import { FaArrowLeft, FaExclamationCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

export function LoginPage() {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setLoginError("");
  
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
  
    if (!email) {
      setEmailError("Email is required");
      return;
    }
  
    if (!password) {
      setPasswordError("Password is required");
      return;
    }
  
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      let data = null;
      try {
        const text = await response.text(); // hindari langsung .json()
        data = text ? JSON.parse(text) : null;
      } catch (err) {
        console.warn("Gagal parsing JSON response:", err);
      }
  
      if (!response.ok) {
        if (data?.message?.includes("Email")) setEmailError(data.message);
        else if (data?.message?.includes("Password")) setPasswordError(data.message);
        setLoginError(data?.message || "Email atau Password tidak sesuai");
        return;
      }
  
      router.push("/homePage");
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Terjadi kesalahan saat login");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      {/* Left Side with Image and Text */}
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
              className="text-white font-jakarta font-medium text-lg flex items-center"
              onClick={() => router.back()}
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

      {/* Right Side Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-10">
        <div className="w-full max-w-md bg-white p-8 rounded-lg">
          <h2 className="text-3xl font-bold font-jakarta text-center mb-4">Welcome Back</h2>
          <p className="text-[#697586] font-jakarta font-normal text-base text-center mb-6">
            Fill your account information to get in
          </p>
          {loginError && (
              <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              <div className="flex items-center">
                <FaExclamationCircle className="mr-2" />
                <span>{loginError}</span>
              </div>
            </div>
          )}
          <form onSubmit={handleLogin}>
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

            <button className="w-full bg-[#1877AA] text-white py-2 font-inter text-sm rounded-md hover:bg-blue-700">
              Login
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
            Don&apos;t have an account? <a href="/register" className="text-[#0040C1]">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;