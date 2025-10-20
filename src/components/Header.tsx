export default function Header() {
  return (
    <header>
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between ">
        <div className="text-6xl font-serif italic bold">Mise</div>
        <div className="flex flex-row gap-6">
          <a className="text-xl " href="/">
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
