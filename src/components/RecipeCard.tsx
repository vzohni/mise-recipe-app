"use client";

import { useState } from "react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface RecipeCardProps {
  slug: string;
  image: string;
  title: string;
  author: string;
  date: string;
  tags: string[];
}

export default function RecipeCard({ slug, image, title, author, date, tags }: RecipeCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited((prev) => !prev);
    // Add favorite logic here (e.g. call API / update parent state)
    console.log(`Toggled favorite for ${title}. New state: ${!isFavorited}`);
  };

  return (
    <Link href={`/recipes/${slug}`} className="block">
      <div className="flex flex-col w-80 gap-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow bg-white relative">
        <button
          onClick={handleFavoriteToggle}
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={isFavorited}
          className="absolute top-2 right-4 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:shadow-md transition-all duration-200 ease-in-out hover:bg-(--primary) text-white z-10"
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
        <div className="flex justify-center gap-2 -m-7 mb-1">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-primary rounded-full text-sm bg-white px-3 py-1 font-serif font-semibold text-transform: capitalize"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="text-center pb-5">
          <h1 className="text-2xl font-serif font-bold text-primary">{title}</h1>
          <p className="text-sm text-gray-600">
            By {author} - {formatDate(date)}
          </p>
        </div>
      </div>
    </Link>
  );
}
