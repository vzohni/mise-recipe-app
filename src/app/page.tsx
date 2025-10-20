import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RecipeCard from "@/components/RecipeCard";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <div>
      <Header></Header>
      <div className="container mx-auto">
        <hr />
      </div>
      <main
        className="container mx-auto px-4
      flex flex-col mb-20"
      >
        <div className="my-10">
          <h1 className="text-3xl font-semibold">Browse Recipes</h1>

          <div className="flex flex-row gap-4 align-bottom justify-between mt-6">
            <h2 className="font-sans-serif">Hundreds of recipes, tailored to your taste.</h2>
            <SearchBar></SearchBar>
            <Button>Add Recipe</Button>
          </div>
        </div>

        <div className="flex w-full">
          <div id="FilterBy" className="flex w-[30%]">
            <h1 className="text-2xl text-[primary] font-semibold">Filter By</h1>
          </div>

          <div id="RecipeCardsGrid" className="grid w-[70%] gap-6 grid-cols-3 p-4">
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}
