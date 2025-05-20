import { deletePostApi } from "@/services/apiPosts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useDeletePost() {
  const queryClient = useQueryClient();

  const {
    mutate,
    isLoading: isDeleting,
    error,
  } = useMutation({
    mutationFn: deletePostApi,
    onSuccess: () => {
      toast.success("Post successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deletePost: mutate, isDeleting, error };
}
