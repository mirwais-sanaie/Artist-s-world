import { createEditPost } from "@/services/apiPosts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useCreatePost() {
  const queryClient = useQueryClient();

  const { mutate: createPost, isLoading: isCreating } = useMutation({
    mutationFn: createEditPost,
    onSuccess: () => {
      toast.success("New post successfully created");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createPost };
}
