"use client";

import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useState } from "react";

const primary = "#2e4442";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle login/signup logic here
  };

  return (
    <div className="flex-row h-screen flex">
      <div className="w-1/2 bg-(--tan) align-bottom justify-end flex flex-col px-20 gap-6 text-center">
        <a href="/" className="absolute top-5 left-10">
          <img src="/Mise_Logo_White.svg" alt="" />
        </a>

        <h1 className="text-4xl leading-2 font-semibold text-(--primary)">Find Your Next Dish</h1>
        <h2 className="font-sans-serif">Hundreds of recipes, to your taste</h2>
        <div className="">
          <img src="/chef.png" alt="" />
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center px-20">
        <div className="w-full max-w-md">
          {!isSignup ? (
            // Login Form
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <h2 className="text-2xl font-semibold text-center text-{primary}">Login</h2>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--primary)"
                  placeholder="Enter your email"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--primary)"
                  placeholder="Enter your password"
                />
              </div>

              <div className="text-right">
                <a href="#" className="text-sm text-(--primary) hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-(--primary) text-white font-semibold py-2 rounded-lg hover:bg-(--hover) transition"
              >
                Login
              </button>

              <div className="text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignup(true)}
                    className="text-(--primary) font-semibold hover:underline cursor-pointer"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </form>
          ) : (
            // Signup Form
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <h2 className="text-2xl font-semibold text-center">Sign Up</h2>

              <div className="flex flex-col gap-2">
                <label htmlFor="username" className="font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574]"
                  placeholder="Choose a username"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574]"
                  placeholder="Enter your email"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574]"
                  placeholder="Create a password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#D4A574] text-white font-semibold py-2 rounded-lg hover:bg-[#C49464] transition"
              >
                Sign Up
              </button>

              <div className="text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignup(false)}
                    className="text-[#D4A574] font-semibold hover:underline cursor-pointer"
                  >
                    Login
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
