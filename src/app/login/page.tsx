"use client";

import Button from "@/components/Button";
import React, { useState } from "react";
import { signIn, signUp } from "@/lib/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { LoginMessages } from "@/components/LoginMessages";

function LoginFormWrapper() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(formData.email, formData.password, formData.name);
        if (error) throw error;
        // Better UX than alert()
        setMessage("Check your email to confirm your account!");
      } else {
        const { error } = await signIn(formData.email, formData.password);
        if (error) throw error;
        const redirectTo = searchParams.get("redirect") || "/";
        router.push(redirectTo);
      }
    } catch (err) {
      if (err instanceof Error) {
        setMessage(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {!isSignUp ? (
        // Login Form
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-center text-(--primary)">Login</h2>

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

          {/* Display server messages from URL and client messages from form submission */}
          <LoginMessages />
          {message && <p className="text-red-500 text-sm text-center">{message}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>

          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
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
            <label htmlFor="name" className="font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--primary)"
              placeholder="Choose a username"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="signup-email" className="font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="signup-email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--primary)"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="signup-password" className="font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="signup-password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--primary)"
              placeholder="Create a password"
            />
          </div>
          {message && <p className="text-red-500 text-sm text-center">{message}</p>}

          {/* <Button type="submit" className="w-full" variant="tan">
            Sign Up
          </Button> */}

          <Button type="submit" className="w-full" variant="tan" disabled={loading}>
            {loading ? "Loading..." : "Sign Up"}
          </Button>

          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className="text-(--primary) font-semibold hover:underline cursor-pointer"
              >
                Login
              </button>
            </p>
          </div>
        </form>
      )}
    </div>
  );
}

export default function Login() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/2 bg-(--tan) flex flex-col pt-6 md:pl-10 md:pr-10 text-center">
        <div className="self-center mb-6 md:self-start">
          <a href="/">
            <img src="/Mise_Logo_White.svg" alt="Mise Logo" />
          </a>
        </div>
        <div className="grow gap-3 flex flex-col justify-center">
          <h1 className="text-2xl leading-2 font-semibold text-(--primary) md:text-4xl">Find Your Next Dish</h1>
          <h2 className="font-sans-serif md:mt-2">Hundreds of recipes, to your taste</h2>
        </div>
        <div className="mt-4 flex justify-center">
          <img src="/chef.png" alt="Chef illustration" className="object-contain max-h-[25vh] md:max-h-full" />
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-20 md:py-12 py-6">
        <Suspense fallback={<div>Loading...</div>}>
          <LoginFormWrapper />
        </Suspense>
      </div>
    </div>
  );
}
