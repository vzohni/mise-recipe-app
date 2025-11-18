"use client";

import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RecipeCard from "@/components/RecipeCard";
import SearchBar from "@/components/SearchBar";
import { getUserFavoriteIds } from "@/lib/favorites";
import { getCurrentUser } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function Home() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);

  // Fetch all recipes on mount
  useEffect(() => {
    loadData();
  }, []);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // 300ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Apply filters whenever search or tags change
  useEffect(() => {
    applyFilters();
  }, [debouncedSearchQuery, selectedTags, recipes]);

  async function loadData() {
    // Get user
    const currentUser = await getCurrentUser();
    setUser(currentUser);

    // Fetch recipes
    const { data, error } = await supabase.from("recipes").select("*").order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching recipes:", error);
    } else {
      setRecipes(data || []);
      setFilteredRecipes(data || []);
    }

    // Fetch user's favorites if logged in
    if (currentUser) {
      const ids = await getUserFavoriteIds(currentUser.id);
      setFavoriteIds(ids);
    }

    setLoading(false);
  }

  function applyFilters() {
    let filtered = recipes;

    // Search filter
    if (debouncedSearchQuery) {
      filtered = filtered.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
          recipe.description?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
    }

    // Tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter((recipe) =>
        selectedTags.some((selectedTag) => recipe.tags?.map((t: string) => t.toLowerCase()).includes(selectedTag))
      );
    }

    setFilteredRecipes(filtered);
  }

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag.toLowerCase()) ? prev.filter((t) => t !== tag.toLowerCase()) : [...prev, tag.toLowerCase()]
    );
  }

  // Get unique tags from all recipes
  const allTags = Array.from(new Set(recipes.flatMap((r) => r.tags?.map((t: string) => t.toLowerCase()) || [])));

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-(--background)">
      <Header />

      <main className="container mx-auto px-4 flex flex-col mb-20 flex-1">
        <div className="my-10">
          <h1 className="text-3xl font-semibold">Browse Recipes</h1>

          <div className="flex flex-row gap-4 align-bottom justify-between mt-6">
            <h2 className="font-sans-serif">Hundreds of recipes, tailored to your taste.</h2>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <a href="/add-recipe">
              <Button variant="secondary">Add Recipe</Button>
            </a>
          </div>
        </div>

        <div className="flex w-full">
          {/* Filter Sidebar */}
          <div id="FilterBy" className="flex w-[30%] flex-col">
            <h1 className="text-2xl text-[primary] font-semibold">Filter By</h1>
            <div className="mt-4 space-y-2">
              {allTags.map((tag) => (
                <label key={tag} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={() => toggleTag(tag)}
                    className="w-4 h-4 rounded border-gray-300 text-[#2E4442] focus:ring-[#2E4442]"
                  />
                  <span className="text-sm">
                    {tag.charAt(0).toUpperCase() + tag.slice(1)} (
                    {recipes.filter((r) => r.tags?.map((t: string) => t.toLowerCase()).includes(tag)).length})
                  </span>
                </label>
              ))}
            </div>
          </div>
          {/* Recipe Grid */}
          <div className="flex-1">
            {filteredRecipes.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No recipes found. Try adjusting your filters.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard
                    id={recipe.id}
                    key={recipe.id}
                    slug={recipe.slug}
                    image={recipe.image_url}
                    title={recipe.title}
                    author={recipe.author}
                    date={recipe.created_at}
                    tags={recipe.tags || []}
                    isFavorited={favoriteIds.includes(recipe.id)}
                    onFavoriteToggle={(recipeId, newStatus) => {
                      setFavoriteIds((prev) =>
                        newStatus ? [...prev, recipeId] : prev.filter((id) => id !== recipeId)
                      );
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
