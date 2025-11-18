"use client";

import { RECIPE_TAGS } from "@/lib/constants";

interface TagSelectProps {
  value: string[];
  onChange: (selectedTags: string[]) => void;
}

export default function TagSelect({ value, onChange }: TagSelectProps) {
  const handleCheckboxChange = (tag: string) => {
    const newSelectedTags = value.includes(tag)
      ? value.filter((t) => t !== tag) // Uncheck: remove from array
      : [...value, tag]; // Check: add to array
    onChange(newSelectedTags);
  };

  return (
    <div className="p-4 border rounded-lg grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 bg-white">
      {RECIPE_TAGS.map((tag) => (
        <label key={tag} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={value.includes(tag)}
            onChange={() => handleCheckboxChange(tag)}
            className="form-checkbox h-5 w-5 text-(--primary) rounded border-gray-300 focus:ring-(--primary)"
          />
          <span className="text-gray-700 capitalize">{tag}</span>
        </label>
      ))}
    </div>
  );
}
