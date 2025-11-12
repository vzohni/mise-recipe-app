import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RecipeCard from "@/components/RecipeCard";
import SearchBar from "@/components/SearchBar";
import { dummyRecipes } from "@/data/recipes";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto">
        <hr />
      </div>
      <main className="container mx-auto px-4 flex flex-col mb-20 flex-1">
        <div className="my-10">
          <h1 className="text-3xl font-semibold">Browse Recipes</h1>

          <div className="flex flex-row gap-4 align-bottom justify-between mt-6">
            <h2 className="font-sans-serif">Hundreds of recipes, tailored to your taste.</h2>
            <SearchBar />
            <Button>Add Recipe</Button>
          </div>
        </div>

        <div className="flex w-full">
          <div id="FilterBy" className="flex w-[30%]">
            <h1 className="text-2xl text-[primary] font-semibold">Filter By</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyRecipes?.length ? (
              dummyRecipes.map((recipe, index) => (
                <Link href={`/recipes/${recipe.slug}`} key={recipe.id ?? index}>
                  <RecipeCard
                    image={recipe.image}
                    title={recipe.title}
                    author={recipe.author}
                    date={recipe.date}
                    tags={recipe.tags}
                  />
                </Link>
              ))
            ) : (
              <h1>No recipes found.</h1>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
