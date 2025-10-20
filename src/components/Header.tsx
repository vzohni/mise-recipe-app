import MiseLogo from "next/image";
export default function Header() {
  return (
    <header>
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <img src="/Mise_Logo.svg" alt="" />
        <div className="flex flex-row gap-6 font-serif">
          <a className="text-xl" href="/">
            Home
          </a>
          <a className="text-xl" href="/account">
            Account
          </a>
          <a className="text-xl" href="/add-recipe">
            Add Recipe
          </a>
        </div>
      </nav>
    </header>
  );
}
