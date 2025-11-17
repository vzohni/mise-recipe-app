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
        <Link href="/">
          <img src="/Mise_Logo.svg" alt="Mise Logo" />
        </Link>
        <div className="flex flex-row items-center gap-8 font-serif">
          {user ? (
            <>
              <span className="text-(--primary) font-semibold">Hi, {user?.user_metadata?.name}!</span>
              <Link
                href="/account/1"
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
      </nav>
      <div className="container mx-auto">
        <hr className="bg-(--primary)" />
        <hr className="bg-(--primary)" />
        <hr className="bg-(--primary)" />
      </div>
    </header>
  );
}
