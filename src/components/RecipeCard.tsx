export default function RecipeCard() {
  return (
    <div className="flex flex-col gap-6 rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow bg-white " >
      <img 
        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" 
        alt="recipe"
        className="w-full h-48 object-cover rounded-xl"
      />
      {/* <div>//tags</div> */}
      <div>
        <h2 className="text-xl font-serif font-bold">Loaded Baked Potato</h2>
        <p className="text-sm text-gray-600">By Bob Jones - May 26, 2025</p>
      </div>
    </div>
  );
}