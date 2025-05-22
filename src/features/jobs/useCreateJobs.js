import { createJob } from "@/services/apiJobs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useCreateJobs() {
  const queryClient = useQueryClient();

  const {
    mutate: createJobFn,
    isLoading,
    error,
  } = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (error) => {
      toast.error("Error posting job: " + error.message);
    },
  });

  return { createJobFn, isLoading, error };
}
