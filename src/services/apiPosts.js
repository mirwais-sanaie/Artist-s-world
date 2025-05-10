import { toast } from "react-toastify";
import supabase from "./supabase";

export async function getPosts() {
  const { data, error } = await supabase.from("posts").select("*");

  if (error) {
    toast.error("Error fetching posts: " + error.message, {
      position: "top-center",
    });
    throw error;
  }
  return data;
}

export async function createPost(post) {
  try {
    const { data, error } = await supabase.from("posts").insert([post]);

    if (error) {
      toast.error("Error creating post: " + error.message, {
        position: "top-center",
      });
      throw error;
    }
    toast.success("Post created successfully!", {
      position: "top-center",
    });
    return data;
  } catch (error) {
    console.error("Error in createPost:", error);
    throw error;
  }
}
