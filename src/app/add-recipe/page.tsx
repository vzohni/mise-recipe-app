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
import { RECIPE_TAGS } from "@/lib/constants";
import DynamicInputList from "@/components/DynamicInputList";

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
  tags: string[];
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
    tags: [],
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

  const toggleTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }));
  };

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

    // --- Form Validation ---
    const { name, author, image, description, prepTime, cookTime, servings, tags, ingredients, instructions } =
      formData;
    const finalIngredients = ingredients.map((i) => i.trim()).filter(Boolean);
    const finalInstructions = instructions.map((i) => i.trim()).filter(Boolean);

    if (!name.trim()) {
      setError("Recipe Name is required.");
      setLoading(false);
      return;
    }
    if (!author.trim()) {
      setError("Author is required.");
      setLoading(false);
      return;
    }
    if (!description.trim()) {
      setError("Description is required.");
      setLoading(false);
      return;
    }
    if (!prepTime || parseInt(prepTime) <= 0) {
      setError("Prep Time must be a positive number.");
      setLoading(false);
      return;
    }
    if (!cookTime || parseInt(cookTime) <= 0) {
      setError("Cook Time must be a positive number.");
      setLoading(false);
      return;
    }
    if (!servings || parseInt(servings) <= 0) {
      setError("Servings must be a positive number.");
      setLoading(false);
      return;
    }
    if (finalIngredients.length === 0) {
      setError("Please add at least one ingredient.");
      setLoading(false);
      return;
    }
    if (finalInstructions.length === 0) {
      setError("Please add at least one instruction step.");
      setLoading(false);
      return;
    }

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
        title: formData.name,
        slug: generateSlug(formData.name),
        description: formData.description,
        image_url: formData.image || null,
        prep_time: parseInt(formData.prepTime),
        cook_time: parseInt(formData.cookTime),
        servings: parseInt(formData.servings),
        difficulty: formData.difficulty,
        ingredients: formData.ingredients.filter((i) => i.trim() !== ""),
        instructions: formData.instructions.filter((i) => i.trim() !== ""),
        user_id: user.id,
        author: formData.author,
        tags: formData.tags,
      };

      // Insert into Supabase
      const { data, error: insertError } = await supabase.from("recipes").insert([recipeData]).select();

      if (insertError) throw insertError;

      // Success! Redirect to homepage
      alert("Recipe added successfully!"); // Consider replacing with a more modern toast notification
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

          <div className="bg-(--tan) p-8 rounded-lg w-full max-w-3xl">
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
                  className="w-full bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent) placeholder-gray-400"
                  required
                  placeholder="e.g. Classic Lasagna"
                  maxLength={100}
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
                  className="w-full bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent) placeholder-gray-400"
                  required
                  placeholder="The recipe creator's name"
                  maxLength={100}
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
                  className="w-full bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent) placeholder-gray-400"
                  placeholder="https://example.com/image.jpg"
                  required
                  maxLength={2048}
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
                  className="w-full bg-white px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent) placeholder-gray-400"
                  required
                  placeholder="A short and enticing summary of your recipe."
                  maxLength={500}
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
                    min="0"
                    max="9999"
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
                    min="0"
                    max="9999"
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
                    min="1"
                    max="999"
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
                <label className="block text-sm font-medium text-(--primary) mb-2">Tags (Select all that apply)</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border border-gray-300 rounded-md max-h-64 overflow-y-auto">
                  {RECIPE_TAGS.map((tag) => (
                    <label key={tag} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.tags.includes(tag)}
                        onChange={() => toggleTag(tag)}
                        className="w-4 h-4 rounded border-gray-300 text-[#2E4442] focus:ring-[#2E4442]"
                      />
                      <span className="text-sm">{tag}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">Selected: {formData.tags.join(", ") || "None"}</p>
              </div>

              {/* Ingredients */}
              <div>
                <DynamicInputList
                  label="Ingredients"
                  field="ingredients"
                  items={formData.ingredients}
                  onItemChange={handleArrayInputChange}
                  onAddItem={addItem}
                  onRemoveItem={removeItem}
                />
              </div>

              {/* Instructions */}
              <div>
                <DynamicInputList
                  label="Instructions"
                  field="instructions"
                  items={formData.instructions}
                  onItemChange={handleArrayInputChange}
                  onAddItem={addItem}
                  onRemoveItem={removeItem}
                  isInstruction={true}
                />
              </div>
              {/* Error Message */}
              {error && <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">{error}</div>}
              {/* Submit Button */}
              <div className="pt-4 text-center">
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
