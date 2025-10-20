export default function RecipeCard() {
  return (
    <div className="flex flex-col w-full gap-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow bg-white relative">
      <button className="absolute top-2 right-4 text-2xl">♡</button>

      <img
        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400"
        alt="recipe"
        className="w-full h-48 object-cover rounded-2xl"
      />

      <div className="flex gap-2 justify-center mt-[-30px]">
        <span className="bg-[#FAFAFA] text-[#222222] px-3 py-1 rounded-full text-sm">Dinner</span>
        <span className="bg-[#FAFAFA] text-[#222222] px-3 py-1 rounded-full text-sm">Entree</span>
      </div>

      <div className="text-center p-4">
        <h2 className="text-xl font-serif font-bold">Loaded Baked Potato</h2>
        <p className="text-sm text-gray-600">By Bob Jones - May 26, 2025</p>
      </div>
    </div>
  );
}
