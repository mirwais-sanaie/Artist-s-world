import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
// import { useAuthContext } from "@/contexts/AuthContextProv";
import { createPost } from "@/services/apiPosts";

export default function CreatePost() {
  // const { user } = useAuthContext();
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      tags: [],
      category: "Character Design",
    },
  });

  // State management
  const fileInputRef = useRef(null);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const categories = [
    "Character Design",
    "Environment Art",
    "Concept Art",
    "Illustration",
    "3D Modeling",
    "Digital Painting",
  ];

  // Form handlers
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log("Form data:", data);
      await createPost(data); // Now properly awaited

      // Reset form
      reset();
      setTags([]);
      setTagInput("");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Submission error:", error);
      // You might want to set some error state here
    } finally {
      setIsSubmitting(false);
    }
  };

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
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>

      <form className="space-y-8" onSubmit={handleSubmit(onSubmit, onError)}>
        {/* Image Upload */}
        <div className="space-y-3">
          <Label htmlFor="image" className="text-myGray-midum font-medium">
            Artwork Image
          </Label>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="image"
                className={`flex flex-col items-center justify-center w-full h-64 border-2 ${
                  selectedFile
                    ? "border-myPurple"
                    : "border-dashed border-myGray-muted"
                } rounded-lg cursor-pointer hover:border-myPurple transition-colors bg-color-card hover:bg-color-card-hover`}
              >
                {selectedFile ? (
                  <div className="flex flex-col items-center justify-center p-4 text-center">
                    <svg
                      className="w-12 h-12 mb-3 text-myPurple"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm text-myGray font-medium">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-myGray-muted mt-1">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-myGray-muted"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-myGray-muted">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-myGray-muted">
                      PNG, JPG or GIF (MAX. 10MB)
                    </p>
                  </div>
                )}
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {selectedFile && (
              <div className="flex items-center justify-between bg-myGray-dark/50 rounded-md px-4 py-2 border border-myGray-muted">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-myGray-midum"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm text-myGray truncate max-w-xs">
                    {selectedFile.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="text-myGray-muted hover:text-myPurple transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
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
            {...register("description")}
            id="description"
            placeholder="Tell us about your artwork..."
            rows={5}
            className="border-border focus:ring-2 focus:ring-myPurple focus:border-transparent text-myGray"
          />
        </div>

        {/* Category */}
        <div className="space-y-3">
          <Label className="text-myGray-midum font-medium">Category</Label>
          <select
            {...register("category")}
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
          <input type="hidden" {...register("tags")} />
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

      {/* Success notification */}
      {isSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg animate-fade-in">
          Artwork published successfully!
        </div>
      )}
    </div>
  );
}
