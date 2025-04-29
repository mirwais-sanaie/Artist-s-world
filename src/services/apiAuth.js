import { useMutation } from "@tanstack/react-query";
import supabase from "./supabase";

export async function signUp(user) {
  const { email, password } = user;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { avatar: "" },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

export function useSignUp() {
  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => console.log("User signed up successfully:", data),
    onError: (error) => console.error("Sign up error:", error.message),
  });
}

export async function signIn(user) {
  const { email, password } = user;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  return true;
}

export function useSignIn() {
  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => console.log("User signed in successfully:", data),
    onError: (error) => console.error("Sign in error:", error.message),
  });
}
