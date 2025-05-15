import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditPost } from "../../services/apiPosts";
import { toast } from "react-toastify";

export function useEditPost() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newPostData, id }) => createEditPost(newPostData, id),
    onSuccess: () => {
      toast.success("Post successfully edited");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCabin };
}
