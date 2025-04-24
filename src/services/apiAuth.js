import { useMutation } from "@tanstack/react-query";
import supabase from "./supabase";

export async function signUp(user) {
  const { email, password } = user; // Destructure the user object to get email and password

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        // fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    console.error("Error signing up:", error.message);
    return null;
  }

  return data;
}

export async function signIn(user) {
  const { email, password } = user;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Error signing in:", error.message);
    return null;
  }

  return data;
}

// Create a mutation hook for sign up
export function useSignUp() {
  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log("User signed up successfully:", data);
    },
    onError: (error) => {
      console.error("Sign up error:", error.message);
    },
  });
}
