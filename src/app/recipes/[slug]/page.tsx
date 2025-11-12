import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { dummyRecipes } from "@/data/recipes";

interface RecipePageProps {
  params: { slug: string };
}

export default function RecipePage({ params }: RecipePageProps) {
  const { slug } = params;

  // You can fetch your recipe data here based on `slug`
  // For example, fetch from an API or database
  const recipe = dummyRecipes.find((r) => String(r.slug) === slug);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-4 flex flex-col mb-20 flex-1">
        <img src={recipe?.image} alt={recipe?.title} className="w-full h-[400px] object-cover" />
        <div className="flex-row flex justify-between w-full align-middle">
          <div className="flex flex-wrap gap-2">
            {recipe
              ? recipe.tags.map((tag, index) => (
                  <div key={index}>
                    <span className=" text-sm bg-cyan-700 text-white p-2 rounded-2xl">{tag}</span>
                  </div>
                ))
              : null}
          </div>

          <h1 className="text-3xl font-semibold mt-6">{recipe ? recipe.title : "Recipe not found"}</h1>
          <h2>{recipe?.date}</h2>
        </div>

        <h2 className="text-center">{recipe?.prepTime}</h2>

        <div className="w-full max-w-3xl mx-auto mt-6 bg-white/5 backdrop-blur-sm rounded-lg p-6 shadow-md border border-gray-700">
          <p className="leading-relaxed mb-6">{recipe?.description}</p>

          <section className="mb-6">
            <h2 className="text-lg font-semibold ">Ingredients</h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2  list-disc list-inside">
              {recipe?.ingredients?.length ? (
                recipe.ingredients.map((ingredient, index) => (
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
                recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="flex-none w-8 h-8 rounded-full bg-cyan-700 text-white grid place-items-center font-medium">
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
