import supabase from "./supabase";

export async function createJob(jobData) {
  const { error } = await supabase.from("jobs").insert([jobData]);

  if (error) {
    console.log("Error inserting job:", error);
  }

  return null;
}

export async function getJobs() {
  const { data, error } = await supabase.from("jobs").select("*");

  if (error) {
    throw new Error("Error fetching jobs: " + error.message);
  }

  return data;
}
