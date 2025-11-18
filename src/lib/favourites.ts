import { supabase } from './supabase';

export async function toggleFavourite(userId: string, recipeId: string) {
  // Check if already favorited
  const { data: existing } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', userId)
    .eq('recipe_id', recipeId)
    .single();

  if (existing) {
    // Remove from favorites
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('recipe_id', recipeId);
    
    return { isFavorited: false, error };
  } else {
    // Add to favorites
    const { error } = await supabase
      .from('favorites')
      .insert([{ user_id: userId, recipe_id: recipeId }]);
    
    return { isFavorited: true, error };
  }
}

export async function checkIfFavorited(userId: string, recipeId: string) {
  const { data } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', userId)
    .eq('recipe_id', recipeId)
    .single();
  
  return !!data;
}

export async function getUserFavorites(userId: string) {
  const { data, error } = await supabase
    .from('favorites')
    .select(`
      recipe_id,
      recipes (*)
    `)
    .eq('user_id', userId);

  if (error) return [];
  return data?.map(f => (f as any).recipes) || [];
}