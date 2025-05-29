import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useCreateJobs } from "./useCreateJobs";
import ErrorText from "@/ui/ErrorText";
import { useState } from "react";

const PostJob = () => {
  const { createJobFn } = useCreateJobs();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isCreating, setIsCreating] = useState(false);

  function onSubmit(data) {
    setIsCreating((isCreating) => !isCreating);
    createJobFn(
      {
        ...data,
      },
      {
        onSuccess: () => {
          toast.success("Job posted successfully!");
          setIsCreating((isCreating) => !isCreating);
        },
      }
    );
    reset();
  }
  console.log(isCreating);
  function onError(error) {
    toast.error("Error posting job: " + error.message);
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-primary shadow-xl rounded-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Post a Job</h2>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="title" className="text-myGray-midum font-medium">
            Title
          </Label>

          <Input
            {...register("title", { required: "Title is required" })}
            type="text"
            id="title"
            placeholder="Enter your artwork title"
            className="bg-color-card selection:bg-myPurple border-border focus:ring-2 focus:ring-myPurple focus:border-transparent text-myGray"
          />
          {errors?.title?.message && (
            <ErrorText>{errors.title.message}</ErrorText>
          )}
        </div>

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
            rows={15}
            className="border-border focus:ring-2 selection:bg-myPurple focus:ring-myPurple focus:border-transparent text-myGray"
          />
          {errors?.description?.message && (
            <ErrorText>{errors.description.message}</ErrorText>
          )}
        </div>

        <Button
          type="submit"
          disabled={isCreating}
          className="w-full bg-gradient-to-r from-myPurple to-myPurple-hover hover:from-myPurple-hover hover:to-myPurple text-white font-bold text-lg py-4 px-4 rounded-lg transition-all shadow-lg hover:shadow-myPurple/30"
        >
          {isCreating ? "Posting..." : "Post Job"}
        </Button>
      </form>
    </div>
  );
};

export default PostJob;
