"use client";

import { useState, useEffect } from "react";
import { getCurrentUser } from "@/lib/auth";
import { toggleFavorite, checkIfFavorited } from "@/lib/favorites";

interface FavoriteButtonProps {
  recipeId: string;
  className?: string;
}

export default function FavoriteButton({ recipeId, className }: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function checkFavoriteStatus() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      if (currentUser) {
        const favorited = await checkIfFavorited(currentUser.id, recipeId);
        setIsFavorited(favorited);
      }
    }
    checkFavoriteStatus();
  }, [recipeId]);

  async function handleToggleFavorite() {
    if (isProcessing) return;

    if (!user) {
      alert("Please login to favorite recipes");
      window.location.href = "/login";
      return;
    }

    setIsProcessing(true);
    const { isFavorited: newStatus } = await toggleFavorite(user.id, recipeId);
    setIsFavorited(newStatus);
    setIsProcessing(false);
  }

  return (
    <button
      type="button"
      onClick={handleToggleFavorite}
      aria-pressed={isFavorited}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      className={className}
      disabled={isProcessing}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill={isFavorited ? "#ef4444" : "none"} stroke={isFavorited ? "#ef4444" : "currentColor"}>
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
