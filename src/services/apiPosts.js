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

export async function createEditPost(newPost, id) {
  const hasImagePath = newPost.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newPost.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newPost.image
    : `${supabaseUrl}/storage/v1/object/public/posts-images/${imageName}`;

  // 1. Create/edit cabin
  let query = supabase.from("posts");

  // A) CREATE
  if (!id) query = query.insert([{ ...newPost, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newPost, image: imagePath }).eq("id", id);

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

  // 3. Delete the cabin IF there was an error uplaoding image
  // if (storageError) {
  //   await supabase.from("cabins").delete().eq("id", data.id);
  //   console.error(storageError);
  //   throw new Error(
  //     "Cabin image could not be uploaded and the cabin was not created"
  //   );
  // }

  return data;
}
