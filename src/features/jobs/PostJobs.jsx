import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useCreateJobs } from "./useCreateJobs";
import ErrorText from "@/ui/ErrorText";
import { useAuthContext } from "@/contexts/AuthContextProv";

const MAX_DESCRIPTION_LENGTH = 500;

const jobLocations = ["Remote", "On-site", "Hybrid"];
const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

const PostJob = () => {
  const { createJobFn } = useCreateJobs();
  const { user } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isCreating, setIsCreating] = useState(false);

  function onSubmit(data) {
    setIsCreating(true);
    createJobFn(
      { ...data },
      {
        onSuccess: () => {
          console.log(data);
          toast.success("Job posted successfully!");
          setIsCreating(false);
          reset();
        },
        onError: () => {
          setIsCreating(false);
        },
      }
    );
  }

  function onError(error) {
    toast.error("Error posting job: " + error.message);
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-primary shadow-xl rounded-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Post a Job</h2>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
        {/* Title */}
        <div className="space-y-3">
          <Label htmlFor="title" className="text-myGray-midum font-medium">
            Title
          </Label>
          <Input
            {...register("title", { required: "Title is required" })}
            type="text"
            id="title"
            placeholder="Job title"
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
              maxLength: {
                value: MAX_DESCRIPTION_LENGTH,
                message: `Description cannot exceed ${MAX_DESCRIPTION_LENGTH} characters`,
              },
            })}
            id="description"
            placeholder="Job description..."
            rows={8}
            className="border-border focus:ring-2 focus:ring-myPurple focus:border-transparent text-myGray"
          />
          {errors?.description?.message && (
            <ErrorText>{errors.description.message}</ErrorText>
          )}
        </div>

        {/* Job Location */}
        <div className="space-y-3">
          <Label className="text-myGray-midum font-medium">Location</Label>
          <select
            {...register("location", { required: "Job location is required" })}
            className="border border-border bg-primary text-myGray rounded-md px-3 py-2 focus:ring-2 focus:ring-myPurple/20 focus:outline-none transition-colors appearance-none w-full"
          >
            {jobLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          {errors?.location?.message && (
            <ErrorText>{errors.location.message}</ErrorText>
          )}
        </div>

        {/* Job Type */}
        <div className="space-y-3">
          <Label className="text-myGray-midum font-medium">Job Type</Label>
          <select
            {...register("jobType", { required: "Job type is required" })}
            className="border border-border bg-primary text-myGray rounded-md px-3 py-2 focus:ring-2 focus:ring-myPurple/20 focus:outline-none transition-colors appearance-none w-full"
          >
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors?.jobType?.message && (
            <ErrorText>{errors.jobType.message}</ErrorText>
          )}
        </div>

        {/* Experience Needed */}
        <div className="space-y-3">
          <Label htmlFor="experience" className="text-myGray-midum font-medium">
            Experience Needed (Years)
          </Label>
          <Input
            {...register("experience", {
              required: "Experience is required",
              valueAsNumber: true,
              min: { value: 0, message: "Minimum is 0" },
            })}
            type="number"
            id="experience"
            placeholder="e.g. 2"
            className="bg-color-card border-border focus:ring-2 focus:ring-myPurple focus:border-transparent text-myGray"
          />
          {errors?.experience?.message && (
            <ErrorText>{errors.experience.message}</ErrorText>
          )}
        </div>

        {/* Company Email */}
        <div className="space-y-3">
          <Label htmlFor="email" className="text-myGray-midum font-medium">
            Company Email
          </Label>
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            type="email"
            id="email"
            placeholder="company@example.com"
            className="bg-color-card border-border focus:ring-2 focus:ring-myPurple focus:border-transparent text-myGray"
          />
          {errors?.email?.message && (
            <ErrorText>{errors.email.message}</ErrorText>
          )}
        </div>

        {/* Company Phone */}
        <div className="space-y-3">
          <Label htmlFor="phone" className="text-myGray-midum font-medium">
            Company Phone Number
          </Label>
          <Input
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^\+?[0-9\s()-]{7,20}$/,
                message: "Invalid phone number",
              },
            })}
            type="tel"
            id="phone"
            placeholder="+93 70 123 4567"
            className="bg-color-card border-border focus:ring-2 focus:ring-myPurple focus:border-transparent text-myGray"
          />
          {errors?.phone?.message && (
            <ErrorText>{errors.phone.message}</ErrorText>
          )}
        </div>

        {/* Submit Button */}
        {user?.aud === "authenticated" ? (
          <Button
            type="submit"
            disabled={isCreating}
            className="w-full bg-gradient-to-r from-myPurple to-myPurple-hover hover:from-myPurple-hover hover:to-myPurple text-white font-bold text-lg py-4 px-4 rounded-lg transition-all shadow-lg hover:shadow-myPurple/30"
          >
            {isCreating ? "Posting..." : "Post Job"}
          </Button>
        ) : (
          <div className="text-red-600">Please SignIn/up first</div>
        )}
      </form>
    </div>
  );
};

export default PostJob;
