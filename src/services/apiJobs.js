import supabase from "./supabase";

export function createJob(jobData) {
  const { data, error } = supabase.from("jobs").insert(jobData);

  if (error) {
    throw new Error("Error creating job: " + error.message);
  }

  return data;
}

export function getJobs() {
  const { data, error } = supabase.from("jobs").select("*");

  if (error) {
    throw new Error("Error fetching jobs: " + error.message);
  }

  return data;
}
