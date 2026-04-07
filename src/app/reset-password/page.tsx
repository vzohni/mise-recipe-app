"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { updatePassword } from "@/lib/auth";
import Button from "@/components/Button";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Supabase fires PASSWORD_RECOVERY when the user arrives via the reset link.
    // The client automatically exchanges the token in the URL hash for a session.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await updatePassword(password);
      if (error) throw error;
      setMessage("Password updated! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      if (err instanceof Error) setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left panel — matches login page */}
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

      {/* Right panel — reset form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-20 md:py-12 py-6">
        <div className="w-full max-w-md">
          {!ready ? (
            <div className="flex flex-col gap-4 text-center">
              <h2 className="text-2xl font-semibold text-(--primary)">Checking reset link...</h2>
              <p className="text-sm text-gray-600">
                If this page doesn't load, the link may have expired.{" "}
                <a href="/login" className="text-(--primary) hover:underline">
                  Request a new one.
                </a>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <h2 className="text-2xl font-semibold text-center text-(--primary)">Set New Password</h2>

              <div className="flex flex-col gap-2">
                <label htmlFor="new-password" className="font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  id="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--primary)"
                  placeholder="Enter new password"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="confirm-password" className="font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--primary)"
                  placeholder="Confirm new password"
                />
              </div>

              {message && (
                <p className={`text-sm text-center ${message.includes("updated") ? "text-green-600" : "text-red-500"}`}>
                  {message}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
