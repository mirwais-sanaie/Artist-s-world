import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useAuthContext } from "@/contexts/AuthContextProv";

export default function CartDetails() {
  const { savedPosts } = useAuthContext();

  if (!savedPosts || savedPosts.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">No saved posts available.</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-1">
        {savedPosts.map((post) => (
          <Link
            key={post.id}
            to={`/category/characterDesign/${post.id}`}
            state={{ post: post }}
          >
            <Card className="group overflow-hidden border-none bg-transparent cursor-pointer p-0 m-0 rounded-sm">
              <CardContent className="relative p-0 m-0 pb-[100%]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 m-0">
                  <div className="transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out">
                    <div className="flex items-center gap-3 m-0 p-0">
                      <Avatar className="h-12 w-12 border border-myaccent m-0 p-0">
                        <AvatarImage src={post?.userAvatar} />
                      </Avatar>
                      <div className="m-0 p-0">
                        <p className="text-white text-lg font-medium m-0 p-0">
                          {post?.userFullName}
                        </p>
                        <p className="text-gray-400 text-sm m-0 p-0">
                          {post.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
