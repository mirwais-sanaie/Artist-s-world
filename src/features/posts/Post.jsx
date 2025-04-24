import { useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";

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
              src={post.src}
              alt={post.title}
              className="w-full h-auto object-contain max-h-[80vh] mx-auto"
            />
          </div>

          {/* Artwork actions */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" className="gap-2">
                <Heart className="w-4 h-4" />
                <span>{post.likes} Likes</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                <span>Comment</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </Button>
            </div>
            <div>
              <Button variant="ghost" size="sm">
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:w-1/5 space-y-6">
          {/* Artist info */}
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={post.avatar} />
              <AvatarFallback>{post.artist.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-white">{post.artist}</h3>
              <p className="text-sm text-gray-400">
                {Math.floor(Math.random() * 10000)} followers
              </p>
            </div>
          </div>

          {/* Follow button */}
          <Button variant="outline" className="w-full">
            Follow
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

            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <p className="text-gray-400">Views</p>
                <p className="font-medium text-white">{post.views}</p>
              </div>
              <div>
                <p className="text-gray-400">Appreciations</p>
                <p className="font-medium text-white">{post.likes}</p>
              </div>
              <div>
                <p className="text-gray-400">Comments</p>
                <p className="font-medium text-white">{post.comments}</p>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              Published: {new Date(post.publishedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
