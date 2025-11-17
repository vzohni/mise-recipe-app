'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import RecipeCard from '@/components/RecipeCard';
import ProtectedRoute from '@/components/ProtectedRoute';
import Button from '@/components/Button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [userRecipes, setUserRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  async function loadUserData() {
    // Get current user
    const currentUser = await getCurrentUser();
    setUser(currentUser);

    if (currentUser) {
      // Fetch recipes created by this user
      const { data: recipes } = await supabase
        .from('recipes')
        .select('*')
        .eq('author', currentUser.user_metadata?.name || currentUser.email)
        .order('created_at', { ascending: false });

      setUserRecipes(recipes || []);
    }
    
    setLoading(false);
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-(--background)">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-1">
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-bold mb-2">
              Hi, {user?.user_metadata?.name || user?.email}
            </h1>
            <p className="text-gray-600">Email: {user?.email}</p>
          </div>

          {/* User's Recipes */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold mb-6">My Recipes</h2>

            {userRecipes.length === 0 ? (
              <div className="text-center py-12 bg-(--tan) rounded-lg">
                <p className="text-gray-700 mb-4">You haven't created any recipes yet.</p>
                <Button onClick={() => (window.location.href = "/add-recipe")}>
                  Create Your First Recipe
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    slug={recipe.slug}
                    image={recipe.image_url}
                    title={recipe.title}
                    author={recipe.author}
                    date={recipe.created_at}
                    tags={recipe.tags || []}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Favorites section - you can add this later */}
          {/* <section>
          <h2 className="text-2xl font-serif font-bold mb-6">Favorite Recipes</h2>
          // Add favorites here when you build that feature
        </section> */}
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}