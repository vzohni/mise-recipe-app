"use client";

export default function Header() {
  return (
    <header>
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/">
          <img src="/Mise_Logo.svg" alt="Mise Logo" />
        </a>
        <div className="flex flex-row gap-6 font-serif">
          <a className="text-xl" href="/">
            Home
          </a>
          <a className="text-xl" href="/account/1">
            Account
          </a>
          <a className="text-xl" href="/login">
            Login
          </a>
          <a className="text-xl" href="/add-recipe">
            Add Recipe
          </a>
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
