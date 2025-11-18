"use client";

import { useState, useEffect } from "react";

interface FavoriteButtonProps {
  recipeId: number;
  className?: string;
}

export default function FavoriteButton({ recipeId, className }: FavoriteButtonProps) {
  // In a real app, you'd fetch the initial favorite status
  const [isFavorited, setIsFavorited] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorited((prev) => !prev);
    // TODO: Add logic to update the favorite status in your database
    console.log(`Toggled favorite for recipe ${recipeId}. New state: ${!isFavorited}`);
  };

  return (
    <button
      type="button"
      onClick={handleToggleFavorite}
      aria-pressed={isFavorited}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      className={className}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill={isFavorited ? "#ef4444" : "none"}
        stroke={isFavorited ? "#ef4444" : "currentColor"}
      >
        <path
          d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
