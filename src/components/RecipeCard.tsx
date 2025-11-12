"use client";
interface RecipeCardProps {
  image: string;
  title: string;
  author: string;
  date: string;
  tags: string[];
}

export default function RecipeCard({ image, title, author, date, tags }: RecipeCardProps) {
  return (
    <div
      className="flex flex-col w-80 gap-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow bg-white relative cursor-pointer"
      onClick={() => console.log(`Clicked ${title}`)}
    >
      <button
        className="absolute top-2 right-4 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer  hover:shadow-md transition-shadow"
        onClick={(e) => {
          e.stopPropagation();
          const btn = e.currentTarget as HTMLButtonElement;
          const isFav = btn.dataset.favorited === "true";

          if (isFav) {
            // set back to white filled heart
            btn.dataset.favorited = "false";
            btn.setAttribute("aria-pressed", "false");
            btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" stroke="#e5e7eb" stroke-width="1.2" aria-hidden="true">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        `;
          } else {
            // set to red filled heart
            btn.dataset.favorited = "true";
            btn.setAttribute("aria-pressed", "true");
            btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ef4444" aria-hidden="true">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        `;
          }

          // Add favorite logic here (e.g. call API / update parent state)
        }}
        aria-label="Toggle favorite"
        data-favorited="false"
        aria-pressed="false"
      >
        {/* initial white heart (will be replaced by innerHTML on click) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#ffffff"
          stroke="#e5e7eb"
          strokeWidth="1.2"
          aria-hidden="true"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-2xl" />
      <div className="flex justify-center gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="text-[#222222] rounded-full text-sm"
            style={{ backgroundColor: "#FAFAFA", padding: "4px 12px" }}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="text-center pb-5">
        <h2 className="text-xl font-serif font-bold">{title}</h2>
        <p className="text-sm text-gray-600">
          By {author} - {date}
        </p>
      </div>
    </div>
  );
}
