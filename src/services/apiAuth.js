/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import supabase from "./supabase";

export async function signUp(user) {
  const { email, password, fullName, image } = user;

  //1 create a unique name for the image
  const imageName = `${crypto.randomUUID()}-${image.name}`.replaceAll("/", "");

  // 2. Upload the image to Supabase Storage
  const { data: uploadImg, error: uploadErr } = await supabase.storage
    .from("avatars")
    .upload(`user-avatars/${imageName}`, image);

  if (uploadErr) {
    throw new Error(`Image upload failed: ${uploadErr.message}`);
  }

  // 3. Get the public URL of the uploaded image
  const { data: publicUrlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(`user-avatars/${imageName}`);

  const avatarUrl = publicUrlData.publicUrl;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        avatar_url: avatarUrl,
      },
    },
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
