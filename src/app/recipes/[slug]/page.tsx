import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { dummyRecipes } from "@/data/recipes";
import FavoriteButton from "@/components/FavoriteButton";
import { supabase } from "@/lib/supabase";
import { formatDate } from "@/lib/utils";

interface RecipePageProps {
  params: { slug: string };
}

export default async function RecipePage({ params }: { params: { slug: string } }) {
  // Fetch recipe by slug

  const { data: recipe, error } = await supabase.from("recipes").select("*").eq("slug", params.slug).single();

  if (error || !recipe) {
    //notFound(); // Shows 404 page
    console.error("Error fetching recipe:", error);
    return null;
  }
  // You can fetch your recipe data here based on `slug`
  // For example, fetch from an API or database
  //const recipe = recipes?.find((r) => String(r.slug) === slug);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 flex flex-col mb-20 flex-1">
        <section className="w-full grid grid-cols-1 md:grid-cols-2  mt-8 items-start h-full">
          <div className="relative p-6 h-full bg-tan align-middle flex flex-col justify-center">
            <FavoriteButton
              recipeId={recipe.id}
              className="absolute top-5 right-5 bg-primary text-white w-11 h-11 rounded-full grid place-items-center shadow-md cursor-pointer hover:shadow-lg transition-shadow bg-(--primary)"
            />

            <h1 className="text-3xl font-semibold text-primary">{recipe ? recipe.title : "Recipe not found"}</h1>
            <p className="text-sm  mt-2">
              {recipe?.author ? `By ${recipe.author}` : "Unknown author"} •{" "}
              {recipe?.created_at ? formatDate(recipe.created_at) : "Unknown date"}
            </p>

            <div className="mt-4">
              <span className="inline-block text-sm rounded-lg font-medium">
                Prep Time: {recipe?.prep_time ? `${recipe.prep_time} min` : "—"}
              </span>
            </div>
            <p className="leading-relaxed mb-6">{recipe?.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {recipe?.tags?.length ? (
                recipe.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-sm bg-primary text-white px-3 py-1 rounded-full font-serif text-transform: capitalize"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-400">No tags</span>
              )}
            </div>
          </div>

          <div className="w-full h-[360px] overflow-hidden bg-gray-800 flex items-center justify-center">
            {recipe?.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={recipe.image_url}
                alt={recipe?.title ?? "Recipe image"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="">No image available</div>
            )}
          </div>
        </section>

        <div className="w-3/5 mx-auto mt-6   p-6  ">
          <section className="mb-6">
            <h2 className="text-lg font-semibold ">Ingredients</h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 list-disc list-inside">
              {recipe?.ingredients?.length ? (
                recipe.ingredients.map((ingredient: string, index: number) => (
                  <li key={index} className="text-sm">
                    {ingredient}
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-400">No ingredients listed.</li>
              )}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold  mb-3">Instructions</h2>
            <ol className="space-y-4">
              {recipe?.instructions?.length ? (
                recipe.instructions.map((instruction: string, index: number) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="flex-none w-8 h-8 rounded-full bg-primary text-white grid place-items-center font-medium">
                      {index + 1}
                    </div>
                    <p className=" text-sm leading-relaxed">{instruction}</p>
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-400">No instructions provided.</li>
              )}
            </ol>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
