/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import ErrorText from "@/ui/ErrorText";
import { useCreatePost } from "./useCreatePost";
import { useEditPost } from "./useEditPost";
import { useAuthContext } from "@/contexts/AuthContextProv";

const categories = [
  "Character Design",
  "Environment Art",
  "Concept Art",
  "Illustration",
  "3D Modeling",
  "Digital Painting",
];

export default function CreatePost({ postToEdit = {}, onCloseModal }) {
  const { user } = useAuthContext();
  const userID = user?.id ? user.id : null;
  const { isEditing, editPost } = useEditPost();
  const { isLoading, createPost } = useCreatePost();
  const isWorking = isLoading || isEditing;
  const { id: editId, ...editValues } = postToEdit;
  const isEditSession = Boolean(editId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(user);

  // const { user } = useAuthContext();
  const { register, handleSubmit, setValue, reset, formState } = useForm({
    defaultValues: isEditSession
      ? editValues
      : { tags: [], category: "Character Design" },
  });
  const { errors } = formState;

  // State management
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    const userFullName = user?.user_metadata?.full_name;
    const userAvatar = user?.user_metadata?.avatar_url;

    if (isEditSession) {
      setIsSubmitting(true);
      editPost(
        {
          newCabinData: { ...data, image, userFullName, userAvatar },
          id: editId,
        },
        {
          onSuccess: (data) => {
            reset();
            setTags([]);
            setTagInput("");
          },
        }
      );
    } else {
      setIsSubmitting(true);
      createPost(
        { ...data, image: image, user_id: userID, userFullName, userAvatar },
        {
          onSuccess: (data) => {
            reset();
            setTags([]);
            setTagInput("");
          },
        }
      );
    }
  }

  const onError = (errors) => {
    console.log("Form errors:", errors);
  };

  // Tag handler
  const handleAddTag = () => {
    const trimmedInput = tagInput.trim();
    if (trimmedInput && !tags.includes(trimmedInput)) {
      const newTags = [...tags, trimmedInput];
      setTags(newTags);
      setValue("tags", newTags);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    setValue("tags", updatedTags);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>

      <form className="space-y-8" onSubmit={handleSubmit(onSubmit, onError)}>
        {/* Image Upload */}

        <div className="space-y-3">
          <input
            type="file"
            accept="image/*"
            {...register("image", {
              required: isEditSession ? false : "This field is required",
            })}
            className="file:bg-myPurple file:text-white file:border-none file:px-4 file:py-2 file:rounded file:cursor-pointer
             bg-color-card text-myGray border border-border focus:ring-2 focus:ring-myPurple"
          />
        </div>

        {/* Title */}
        <div className="space-y-3">
          <Label htmlFor="title" className="text-myGray-midum font-medium">
            Title
          </Label>

          <Input
            {...register("title", { required: "Title is required" })}
            type="text"
            id="title"
            placeholder="Enter your artwork title"
            className="bg-color-card border-border focus:ring-2 focus:ring-myPurple focus:border-transparent text-myGray"
          />
          {errors?.title?.message && (
            <ErrorText>{errors.title.message}</ErrorText>
          )}
        </div>

        {/* Description */}
        <div className="space-y-3">
          <Label
            htmlFor="description"
            className="text-myGray-midum font-medium"
          >
            Description
          </Label>
          <Textarea
            {...register("description", {
              required: "Description is required",
            })}
            id="description"
            placeholder="Tell us about your artwork..."
            rows={5}
            className="border-border focus:ring-2 focus:ring-myPurple focus:border-transparent text-myGray"
          />
          {errors?.description?.message && (
            <ErrorText>{errors.description.message}</ErrorText>
          )}
        </div>

        {/* Category */}
        <div className="space-y-3">
          <Label className="text-myGray-midum font-medium">Category</Label>
          <select
            {...register("category", { required: "Category is required" })}
            className="border border-border bg-primary text-myGray rounded-md px-3 py-2 focus:ring-2 focus:ring-myPurple/20 focus:outline-none transition-colors appearance-none pr-7 bg-[length:16px_16px] bg-[right_8px_center] bg-no-repeat w-full"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23A0A0A0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
            }}
          >
            {categories.map((category) => (
              <option
                key={category}
                value={category}
                className="hover:bg-myPurple/10 focus:bg-myPurple/20 bg-primary"
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div className="space-y-3">
          <Label className="text-myGray-midum font-medium">Tags</Label>
          <div className="flex gap-2">
            <Input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add tags (e.g. fantasy, digital)"
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), handleAddTag())
              }
              className="bg-color-card border-border focus:ring-2 focus:ring-myPurple focus:border-transparent text-myGray"
            />
            <Button
              type="button"
              onClick={handleAddTag}
              className="bg-myPurple hover:bg-myPurple-hover text-white"
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center bg-myPurple/20 rounded-full px-3 py-1 text-sm text-myGray border border-myPurple/30"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-myGray-muted hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <input
            type="hidden"
            {...register("tags", {
              required: "At least one tag is required",
            })}
          />
          {errors?.tags?.message && (
            <ErrorText>{errors.tags.message}</ErrorText>
          )}
        </div>

        <div className="pt-6">
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-myPurple to-myPurple-hover hover:from-myPurple-hover hover:to-myPurple text-white font-bold py-3 px-4 rounded-lg transition-all shadow-lg hover:shadow-myPurple/30"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publishing..." : "Publish Artwork"}
          </Button>
        </div>
      </form>
    </div>
  );
}
