import { getJobs } from "@/services/apiJobs";
import { useQuery } from "@tanstack/react-query";

export function useJobs() {
  const {
    data: jobs,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
  });

  return {
    jobs,
    error,
    isLoading,
  };
}
