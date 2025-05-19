import { deletePostApi } from "@/services/apiPosts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useDeletePost() {
  const queryClient = useQueryClient();
  const {
    mutate: deletePost,
    isLoading: isDeleting,
    error,
  } = useMutation({
    mutationFn: deletePostApi,
    onSuccess: () => {
      toast.success("Post successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      Navigate("/category/characterDesign");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deletePost, error };
}
