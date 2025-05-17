import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Post() {
  const { state } = useLocation();
  const post = state?.post;

  if (!post) {
    return <div>Loading...</div>;
  }

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

          {/* Follow button */}
          <Button
            variant="outline"
            className="w-full bg-primary hover:bg-myPurple duration-300 text-white cursor-pointer"
          >
            Add to favorites
          </Button>

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
        </div>
      </div>
    </div>
  );
}
