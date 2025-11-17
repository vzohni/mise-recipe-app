"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { getCurrentUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { generateSlug } from "@/lib/utils";

type Difficulty = "easy" | "medium" | "hard";

interface RecipeFormData {
  name: string;
  slug: string;
  image: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  difficulty: Difficulty;
  ingredients: string[];
  instructions: string[];
  author: string;
  tags: string;
}

export default function AddRecipe() {
  const [formData, setFormData] = useState<RecipeFormData>({
    name: "",
    slug: "",
    image: "",
    description: "",
    prepTime: "",
    cookTime: "",
    servings: "",
    difficulty: "easy",
    ingredients: [""] as string[],
    instructions: [""] as string[],
    author: "",
    tags: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndSetAuthor = async () => {
      const user = await getCurrentUser();
      if (user) {
        setFormData((prev) => ({
          ...prev,
          author: user.user_metadata?.name || "",
        }));
      }
    };
    fetchUserAndSetAuthor();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayInputChange = (index: number, field: "ingredients" | "instructions", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addItem = (field: "ingredients" | "instructions") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeItem = (field: "ingredients" | "instructions", index: number) => {
    if (formData[field].length > 1) {
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Get current user
      const user = await getCurrentUser();
      if (!user) {
        setError("You must be logged in to add a recipe");
        setLoading(false);
        return;
      }

      // Prepare data for Supabase (match your database column names)
      const recipeData = {
        slug: generateSlug(formData.name),
        title: formData.name,
        description: formData.description,
        image_url: formData.image || null,
        prep_time: parseInt(formData.prepTime),
        cook_time: parseInt(formData.cookTime),
        servings: parseInt(formData.servings),
        difficulty: formData.difficulty,
        ingredients: formData.ingredients.filter((i) => i.trim() !== ""), // Remove empty strings
        instructions: formData.instructions.filter((i) => i.trim() !== ""), // Remove empty strings
        author: formData.author,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim().toLowerCase())
          .filter((tag) => tag), // Split and clean tags
      };

      // Insert into Supabase
      const { data, error: insertError } = await supabase.from("recipes").insert([recipeData]).select();

      if (insertError) throw insertError;

      // Success! Redirect to homepage
      alert("Recipe added successfully!");
      router.push("/");
    } catch (err: any) {
      console.error("Error adding recipe:", err);
      setError(err.message || "Failed to add recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-(--background)">
        <Header />

        <main className="container mx-auto px-4 flex flex-col mb-20 flex-1 justify-center items-center">
          <h1 className="text-3xl font-semibold mt-8 text-(--primary) mb-6">Add Recipe</h1>

          <div className="bg-(--tan) p-8 rounded-lg w-full max-w-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Recipe Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-(--primary) mb-2">
                  Recipe Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent)"
                  required
                />
              </div>

              {/* Author */}
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-(--primary) mb-2">
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent)"
                  required
                  placeholder="The recipe creator's name"
                />
              </div>

              {/* Recipe Image */}
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-(--primary) mb-2">
                  Recipe Image URL
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent)"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Recipe Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-(--primary) mb-2">
                  Recipe Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent)"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Prep Time */}
                <div>
                  <label htmlFor="prepTime" className="block text-sm font-medium text-(--primary) mb-2">
                    Prep Time (min)
                  </label>
                  <input
                    type="number"
                    id="prepTime"
                    name="prepTime"
                    value={formData.prepTime}
                    onChange={handleInputChange}
                    className="w-full bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent)"
                    required
                  />
                </div>

                {/* Cook Time */}
                <div>
                  <label htmlFor="cookTime" className="block text-sm font-medium text-(--primary) mb-2">
                    Cook Time (min)
                  </label>
                  <input
                    type="number"
                    id="cookTime"
                    name="cookTime"
                    value={formData.cookTime}
                    onChange={handleInputChange}
                    className="w-full bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent)"
                    required
                  />
                </div>

                {/* Servings */}
                <div>
                  <label htmlFor="servings" className="block text-sm font-medium text-(--primary) mb-2">
                    Servings
                  </label>
                  <input
                    type="number"
                    id="servings"
                    name="servings"
                    value={formData.servings}
                    onChange={handleInputChange}
                    className="w-full bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent)"
                    required
                  />
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-(--primary) mb-2">
                  Difficulty
                </label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="w-full bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent)"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-(--primary) mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent)"
                  placeholder="e.g. quick, dessert, vegan"
                />
                <p className="text-xs text-gray-500 mt-1">Separate tags with a comma.</p>
              </div>

              {/* Ingredients */}
              <div>
                <label className="block text-sm font-medium text-(--primary) mb-2">Ingredients</label>
                {formData.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => handleArrayInputChange(index, "ingredients", e.target.value)}
                      placeholder={`Ingredient ${index + 1}`}
                      className="flex-1 bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent)"
                    />
                    <button
                      type="button"
                      onClick={() => removeItem("ingredients", index)}
                      className="cursor-pointer px-3 py-2 bg-red-700 text-white rounded-md hover:bg-red-600"
                      disabled={formData.ingredients.length === 1}
                    >
                      -
                    </button>
                    {index === formData.ingredients.length - 1 && (
                      <button
                        type="button"
                        onClick={() => addItem("ingredients")}
                        className="cursor-pointer px-3 py-2 bg-(--primary) text-white rounded-md hover:bg-(--hover)"
                      >
                        +
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Instructions */}
              <div>
                <label className="block text-sm font-medium text-(--primary) mb-2">Instructions</label>
                {formData.instructions.map((instruction, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex gap-2 mb-2">
                      <span className="font-medium">Step {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeItem("instructions", index)}
                        className="px-2 bg-red-700 text-white rounded-md hover:bg-red-600 text-sm"
                        disabled={formData.instructions.length === 1}
                      >
                        -
                      </button>
                      {index === formData.instructions.length - 1 && (
                        <button
                          type="button"
                          onClick={() => addItem("instructions")}
                          className="px-2 bg-(--primary) text-white rounded-md hover:bg-(--hover) text-sm"
                        >
                          +
                        </button>
                      )}
                    </div>
                    <textarea
                      value={instruction}
                      onChange={(e) => handleArrayInputChange(index, "instructions", e.target.value)}
                      placeholder={`Step ${index + 1} instructions...`}
                      rows={2}
                      className="w-full bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent)"
                    />
                  </div>
                ))}
              </div>
              {/* Error Message */}
              {error && <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">{error}</div>}
              {/* Submit Button */}
              <div className="pt-4">
                <Button type="submit" className="w-full">
                  Add Recipe
                </Button>
              </div>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
