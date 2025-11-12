import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import { dummyRecipes } from "@/data/recipes";
import Link from "next/link";
import RecipeCard from "@/components/RecipeCard";

export default function Account() {
  // For demonstration - set to empty array to test "no recipes" message
  const favouriteRecipes: any = [];

  return (
    <div className="flex flex-col min-h-screen bg-(--background)">
      <Header />
      <main className="container mx-auto px-4 flex flex-col mb-20 flex-1">
        <div>
          <h1 className="text-3xl font-semibold mt-8 text-(--primary)">Hi USERNAME</h1>
          <h2 className="text-(--primary)">Email: bobjones@gmail.com</h2>
        </div>
        <div className="mt-6 flex flex-row gap-4">
          <Button>Change Password</Button>
          <Button>Log Out</Button>
          <Button>Delete Account</Button>
        </div>

        <h1 className="text-3xl font-semibold mt-8 text-(--primary) mb-5">Favourite Recipes</h1>

        {favouriteRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favouriteRecipes.map((recipe) => (
              <Link href={`/recipes/${recipe.slug}`} key={recipe.slug}>
                <RecipeCard
                  image={recipe.image}
                  title={recipe.title}
                  author={recipe.author}
                  date={recipe.date}
                  tags={recipe.tags}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-8 bg-(--tan)">
            <div>
              <h1 className="text-lg font-bold ">No recipes yet...</h1>
              <a href="/">
                <Button>Browse Recipes</Button>
              </a>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
