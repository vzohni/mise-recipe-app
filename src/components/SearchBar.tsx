export default function SearchBar() {
  return (
    <div className="relative max-w-2xl">
      <input
        type="text"
        placeholder="Search recipes..."
        className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2E4442]"
      />
      <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">🔍</button>
    </div>
  );
}
