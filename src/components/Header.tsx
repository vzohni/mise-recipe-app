"use client";

import { getCurrentUser, signOut } from "@/lib/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  user_metadata: {
    name?: string;
  };
}
export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  console.log(user);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  }

  async function handleSignOut() {
    await signOut();
    setUser(null);
    router.push("/");
  }

  return (
    <header>
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between text-xl">
        <Link href="/" className="relative flex items-center group">
          <img
            src="/Mise_Logo.svg"
            alt="Mise Logo"
            className="h-10 md:h-12 transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute left-full ml-3 text-lg font-serif text-(--primary) transition-all duration-300 opacity-0 group-hover:opacity-100 whitespace-nowrap">
            Home
          </span>
        </Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex flex-row items-center gap-8 font-serif">
          {user ? (
            <>
              <span className="text-(--primary) font-semibold">Hi, {user?.user_metadata?.name}!</span>
              <Link
                href="/account"
                className="bg-linear-to-r from-current to-current bg-size-[0%_2px] bg-no-repeat bg-left-bottom transition-[background-size] duration-300 hover:bg-size-[100%_2px]"
              >
                Account
              </Link>
              <Link
                href="/add-recipe"
                className="bg-linear-to-r from-current to-current bg-size-[0%_2px] bg-no-repeat bg-left-bottom transition-[background-size] duration-300 hover:bg-size-[100%_2px]"
              >
                Add Recipe
              </Link>
              <button
                onClick={handleSignOut}
                className="bg-linear-to-r from-current to-current bg-size-[0%_2px] bg-no-repeat bg-left-bottom transition-[background-size] duration-300 hover:bg-size-[100%_2px] cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-linear-to-r from-current to-current bg-size-[0%_2px] bg-no-repeat bg-left-bottom transition-[background-size] duration-300 hover:bg-size-[100%_2px]"
            >
              Login
            </Link>
          )}
        </div>
        {/* Hamburger Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 text-(--primary)"
          >
            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden bg-white transition-all duration-300 ease-in-out shadow-lg
          ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}
        `}
      >
        <div className="px-4 py-4">
          {user ? (
            <>
              <span className="text-(--primary) font-semibold w-full border-b pb-2 block mb-4 font-serif">
                Hi, {user?.user_metadata?.name}!
              </span>
              <div className="flex flex-col items-start gap-4 font-serif text-lg">
                <Link href="/account" className="hover:text-(--primary)">Account</Link>
                <Link href="/add-recipe" className="hover:text-(--primary)">Add Recipe</Link>
                <button onClick={handleSignOut} className="hover:text-(--primary) text-left">Logout</button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-start gap-4 font-serif text-lg">
              <Link href="/login" className="hover:text-(--primary)">Login</Link>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto">
        <hr className="bg-(--primary)" />
        <hr className="bg-(--primary)" />
        <hr className="bg-(--primary)" />
      </div>
    </header>
  );
}
