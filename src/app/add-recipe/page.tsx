"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { useState } from "react";

export default function AddRecipe() {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    prepTime: "",
    cookTime: "",
    servings: "",
    difficulty: "easy",
    ingredients: [""],
    instructions: [""]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInputChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const removeItem = (field, index) => {
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  return (
    <div className="flex flex-col min-h-screen bg-(--background)">
      <Header />

      <main className="container mx-auto px-4 flex flex-col mb-20 flex-1">
        <h1 className="text-3xl font-semibold mt-8 text-(--primary) mb-6">Add Recipe</h1>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent)"
              required
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent)"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent)"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent)"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent)"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent)"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent)"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-sm font-medium text-(--primary) mb-2">
              Ingredients
            </label>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleArrayInputChange(index, "ingredients", e.target.value)}
                  placeholder={`Ingredient ${index + 1}`}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent)"
                />
                <button
                  type="button"
                  onClick={() => removeItem("ingredients", index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  disabled={formData.ingredients.length === 1}
                >
                  -
                </button>
                {index === formData.ingredients.length - 1 && (
                  <button
                    type="button"
                    onClick={() => addItem("ingredients")}
                    className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-sm font-medium text-(--primary) mb-2">
              Instructions
            </label>
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="mb-4">
                <div className="flex gap-2 mb-2">
                  <span className="font-medium">Step {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeItem("instructions", index)}
                    className="px-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                    disabled={formData.instructions.length === 1}
                  >
                    -
                  </button>
                  {index === formData.instructions.length - 1 && (
                    <button
                      type="button"
                      onClick={() => addItem("instructions")}
                      className="px-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-(--accent)"
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button type="submit" className="w-full">
              Add Recipe
            </Button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
