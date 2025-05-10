import { getPosts } from "@/services/apiPosts";
import { useQuery } from "@tanstack/react-query";

export function usePosts() {
  const {
    isLoading,
    data: posts,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return {
    isLoading,
    posts,
    error,
  };
}
