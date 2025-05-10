import { useMutation } from "@tanstack/react-query";
import supabase from "./supabase";

export async function signUp(user) {
  const { email, password } = user;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    // options: {
    //   data: { avatar: "" },
    // },
  });
  if (error) throw new Error(error.message);
  return data;
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

export function useSignUp() {
  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => console.log("User signed up successfully:", data),
    onError: (error) => console.error("Sign up error:", error.message),
  });
}

export function useSignIn() {
  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => console.log("User signed in successfully:", data),
    onError: (error) => console.error("Sign in error:", error.message),
  });
}

// Google Auth Functions
// Google Sign In (popup)
// export async function signInWithGoogle() {
//   return new Promise((resolve, reject) => {
//     const { data, error } = supabase.auth.signInWithOAuth({
//       provider: "google",
//       options: {
//         queryParams: { prompt: "select_account" },
//         flow: "popup",
//       },
//     });

//     if (error) return reject(error);

//     const { subscription } = supabase.auth.onAuthStateChange(
//       (event, session) => {
//         if (event === "SIGNED_IN" && session?.user) {
//           toast.success("Google sign in successful!", {
//             position: "top-center",
//           });
//           subscription.unsubscribe();
//           resolve(session);
//         }
//       }
//     );
//   });
// }

// export async function signUpWithGoogle() {
//   return signInWithGoogle();
// }

// export function useSignInWithGoogle() {
//   return useMutation({
//     mutationFn: signInWithGoogle,
//     onError: (err) => {
//       toast.error(err.message, { position: "top-center" });
//     },
//   });
// }

// export function useSignUpWithGoogle() {
//   return useMutation({
//     mutationFn: signUpWithGoogle,
//     onError: (err) => {
//       toast.error(err.message, { position: "top-center" });
//     },
//   });
// }
