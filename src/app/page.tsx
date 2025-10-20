import Header from "@/components/Header";
import RecipeCard from "@/components/RecipeCard";

export default function Home() {
  return (
    <div>
      <Header></Header>

      <main
        className="container mx-auto px-4 
      flex flex-col"
      >
        <h1>This is an update 2</h1>
       <div className="flex" style={{gap: '24px'}}>
          <RecipeCard />
          <RecipeCard />
        </div>
      </main>
    </div>
  );
}
