"use client";

import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { getCurrentUser } from "@/lib/auth";
import { toggleFavorite } from "@/lib/favorites";

interface RecipeCardProps {
  id: string;
  slug: string;
  image: string;
  title: string;
  author: string;
  date: string;
  tags: string[];
  isFavorited?: boolean;
  onFavoriteToggle?: (recipeId: string, newStatus: boolean) => void;
  showDeleteButton?: boolean;
  onDelete?: (recipeId: string) => Promise<void>;
}

export default function RecipeCard({
  id,
  slug,
  image,
  title,
  author,
  date,
  tags,
  isFavorited = false,
  onFavoriteToggle,
  showDeleteButton = false,
  onDelete,
}: RecipeCardProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleFavoriteToggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (isProcessing) return;

    const user = await getCurrentUser();
    if (!user) {
      alert("Please login to favorite recipes");
      window.location.href = "/login";
      return;
    }

    setIsProcessing(true);
    const { isFavorited: newStatus } = await toggleFavorite(user.id, id);
    onFavoriteToggle?.(id, newStatus);
    setIsProcessing(false);
  }

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (isDeleting || !onDelete) return;

    setIsDeleting(true);
    await onDelete(id);
    // No need to set isDeleting to false, as the component will be unmounted.
  }

  return (
    <Link href={`/recipes/${slug}`} className="block">
      <div className="flex flex-col w-full md:w-80 gap-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow bg-white relative mx-auto">
        {showDeleteButton && onDelete && (
          <button
            onClick={handleDelete}
            aria-label="Delete recipe"
            className="absolute top-2 left-4 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:shadow-md transition-all duration-200 ease-in-out bg-red-600 hover:bg-red-700 text-white z-10"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            )}
          </button>
        )}
        <button
          onClick={handleFavoriteToggle}
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={isFavorited}
          className="absolute top-2 right-4 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:shadow-md transition-all duration-200 ease-in-out hover:bg-(--primary) text-white z-10"
          disabled={isProcessing}
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
        <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-2xl" />

        {/* Container for tags and text */}
        <div className="flex flex-col items-center px-3 pb-5">
          {/* Tags with negative margin to pull them up */}
          <div className="flex flex-wrap justify-center gap-2 -mt-8 mb-4">
            {tags.slice(0, 5).map((tag, index) => (
              <span
                key={index}
                className="text-primary rounded-full text-sm bg-white px-3 py-1 font-serif font-semibold text-transform: capitalize shadow-sm"
              >
                {tag}
              </span>
            ))}
            {tags.length > 5 && (
              <span
                className="text-primary rounded-full text-sm bg-white px-3 py-1 font-serif font-semibold shadow-sm"
              >
                +{tags.length - 5}
              </span>
            )}
          </div>
          {/* Text content */}
          <h1 className="text-2xl font-serif font-bold text-primary text-center">{title}</h1>
          <p className="text-sm text-gray-600 text-center">By {author} - {formatDate(date)}</p>
        </div>
      </div>
    </Link>
  );
}
