import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function FakeCartPost() {
  const fakePost = {
    id: "1",
    title: "Fantasy Warrior",
    description: "A powerful warrior in a magical realm.",
    image: "https://picsum.photos/seed/art1/300/200",
    userFullName: "Jane Doe",
    userAvatar: "https://picsum.photos/seed/avatar1/100",
    tags: ["Fantasy", "Warrior", "Digital"],
    created_at: new Date().toISOString(),
  };

  return (
    <div className="flex items-center gap-4 p-4 border border-gray-700 rounded-lg bg-gray-900 shadow-md">
      <img
        src={fakePost.image}
        alt={fakePost.title}
        className="w-32 h-20 object-cover rounded-md"
      />
      <div className="flex-1 space-y-1">
        <h2 className="text-white font-semibold">{fakePost.title}</h2>
        <p className="text-sm text-gray-400">{fakePost.description}</p>
        <div className="flex items-center gap-2 mt-1">
          <div className="h-6 w-6 rounded-full overflow-hidden border-2 border-myPurple">
            <img
              src={fakePost.userAvatar}
              alt={fakePost.userFullName}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-xs text-gray-300">{fakePost.userFullName}</span>
        </div>
      </div>
      <Button
        variant="outline"
        className="bg-red-600 hover:bg-red-700 text-white"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
