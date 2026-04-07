import { supabase } from "./supabase";

export async function signUp(email: string, password: string, name: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name, // Store name in user metadata
      }
    }
  });
  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    // Invalid/expired refresh token — clear the bad session silently
    await supabase.auth.signOut();
    return null;
  }
  return user;
}

export async function requestPasswordReset(email: string, redirectTo: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  });
  return { error };
}

export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  return { error };
}
