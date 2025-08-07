/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import supabase from "./supabase";

export async function signUp(user) {
  const { email, password, fullName, image } = user;

  //1 Upload the image
  const imageName = `${crypto.randomUUID()}-${image.name}`.replaceAll("/", "");
  const { data: uploadImg, error: uploadErr } = await supabase.storage
    .from("avatars")
    .upload(`user-avatars/${imageName}`, image);

  if (uploadErr) {
    throw new Error(`Image upload failed: ${uploadErr.message}`);
  }

  //2 Get public URL
  const { data: publicUrlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(`user-avatars/${imageName}`);
  const avatarUrl = publicUrlData.publicUrl;

  const { data, error } = await supabase.auth.updateUser({
    password,
    data: {
      full_name: fullName,
      avatar_url: avatarUrl,
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

export async function signUpWithOTP(email) {
  try {
    // Validate email format first
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Please enter a valid email address");
    }

    const { data, error } = await supabase.auth.signInWithOtp({
      email: String(email).trim(),
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Supabase OTP Error:", {
        code: error.code,
        message: error.message,
        status: error.status,
      });

      let friendlyMessage =
        "Failed to send Verification code. Please try again.";
      if (error.message.includes("rate limit exceeded")) {
        friendlyMessage =
          "Too many requests. Please wait 5 minutes before trying again.";
      } else if (error.message.includes("email provider not enabled")) {
        friendlyMessage = "Email signups are currently disabled.";
      }

      throw new Error(friendlyMessage);
    }

    return data;
  } catch (err) {
    console.error("OTP Send Exception:", err);
    throw err;
  }
}

export async function verifyOTP({ email, token }) {
  const { data, error } = await supabase.auth.verifyOtp({
    email: String(email).trim(),
    token: String(token).trim(),
    type: "email",
  });

  if (error) {
    throw new Error(
      error.message.includes("expired")
        ? "OTP expired. Please request a new code."
        : error.message.includes("invalid")
        ? "Invalid OTP. Please check the code."
        : error.message
    );
  }

  return data;
}

export function useSignUpWithOTP() {
  return useMutation({
    mutationFn: signUpWithOTP,
  });
}

export function useVerifyOTP() {
  return useMutation({
    mutationFn: verifyOTP,
  });
}
