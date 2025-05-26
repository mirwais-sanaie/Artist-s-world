import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useDeletePost } from "./useDeletePost";
import { useAuthContext } from "@/contexts/AuthContextProv";
import { useNavigate } from "react-router-dom";

export default function Post() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const post = state?.post;

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { deletePost, isDeleting } = useDeletePost();

  const { user, savedPosts, addToSavedPosts, removeFromSavedPosts } =
    useAuthContext();

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!post) return;
    const alreadySaved = savedPosts.some((p) => p.id === post.id);
    setIsSaved(alreadySaved);
  }, [post, savedPosts]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const handleDelete = () => {
    deletePost(post.id, {
      onSuccess: () => {
        navigate(`/category/characterDesign`);
      },
    });
  };

  const handleSaveToLocalStorage = () => {
    if (!post) return;

    if (isSaved) {
      removeFromSavedPosts(post.id);
    } else {
      addToSavedPosts(post);
    }

    setIsSaved(!isSaved);
  };

  return (
    <div className=" mx-auto px-4 py-2">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-4/5">
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-contain max-h-[80vh] mx-auto"
            />
          </div>
        </div>

        <div className="lg:w-1/5 space-y-6">
          {/* Artist info */}
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full border-2 border-myPurple shadow-md overflow-hidden">
              <img
                src={post.userAvatar}
                alt={post.artist}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-white">{post.userFullName}</h3>
              <p className="text-sm text-gray-400">Author</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-white">{post.title}</h2>
              <p className="text-gray-400">{post.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-xs text-gray-500">
              Published: {new Date(post.created_at).toISOString().split("T")[0]}
            </p>
          </div>

          {/* Action button */}
          <div className="flex">
            {/* <Button
              variant="outline"
              className="bg-primary group hover:bg-white duration-300 text-white cursor-pointer"
            >
              <Heart className="h-4 w-4 text-white group-hover:text-black" />
            </Button> */}

            <Button
              variant="outline"
              onClick={handleSaveToLocalStorage}
              className="bg-primary group hover:bg-white duration-300 text-white cursor-pointer hover:text-black"
            >
              {isSaved ? (
                "remove from favorites"
              ) : (
                <Heart
                  className={`h-4 w-4 ${
                    isSaved ? "text-red-500" : "text-white"
                  } group-hover:text-black`}
                />
              )}
            </Button>

            {user?.id === post.user_id && (
              <Button
                onClick={() => setIsDeleteOpen(true)}
                variant="outline"
                className="bg-primary group hover:bg-red-500 duration-300 text-white cursor-pointer ml-2"
              >
                <Trash2 className="h-4 w-4 text-red-500 group-hover:text-white" />
              </Button>
            )}
          </div>
        </div>

        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogContent className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-lg bg-primary p-6 text-white shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  Confirm Deleting
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  Are you sure you want to delete this post?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-4 flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteOpen(false)}
                  disabled={isDeleting}
                  className="text-white border-gray-600 hover:bg-gray-700"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-red-500 hover:bg-red-600 text-white cursor-pointer"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
