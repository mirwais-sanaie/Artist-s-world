/* eslint-disable no-unused-vars */
import { toast } from "react-toastify";
import supabase, { supabaseUrl } from "./supabase";

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

export async function createNewPost(newPost, id) {
  const hasImagePath = newPost.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newPost.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newPost.image
    : `${supabaseUrl}/storage/v1/object/public/posts-images/${imageName}`;

  // 1. Create cabin
  let query = supabase.from("posts");

  // A) CREATE
  if (!id) query = query.insert([{ ...newPost, image: imagePath }]);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("posts-images")
    .upload(imageName, newPost.image);

  return data;
}

export async function deletePostApi(id) {
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    toast.error("Error deleting post: " + error.message, {
      position: "top-center",
    });
    throw error;
  }
}
