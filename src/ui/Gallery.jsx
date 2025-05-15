/* eslint-disable no-unused-vars */
import { Card, CardContent } from "@/components/ui/card";
import { usePosts } from "@/features/posts/usePosts";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

function Gallery({ text, numImg, from }) {
  // const galleryItems = Array.from({ length: numImg }).map((_, i) => ({
  //   id: i + 1,
  //   title: `Artwork ${i + 1}`,
  //   artist: `Artist ${i + 1}`,
  //   description: `This is a detailed description of Artwork ${
  //     i + 1
  //   } created by Artist ${i + 1}`,
  //   likes: Math.floor(Math.random() * 1000),
  //   views: Math.floor(Math.random() * 5000),
  //   comments: Math.floor(Math.random() * 100),
  //   tags: ["digital", "concept", "art", "illustration"].slice(
  //     0,
  //     Math.floor(Math.random() * 4) + 1
  //   ),
  //   avatar: `https://randomuser.me/api/portraits/${
  //     i % 2 === 0 ? "men" : "women"
  //   }/${i + 10}.jpg`,
  //   src: `https://picsum.photos/id/${i + from}/600/600`,
  //   publishedAt: new Date(
  //     Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
  //   ).toISOString(),
  // }));

  const { isLoading, posts } = usePosts();

  if (isLoading) return <Spinner />;

  return (
    <div className="py-8">
      <h1 className="font-bold text-3xl md:text-4xl mb-6">{text}</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-1">
        {/* {galleryItems.map((item) => (
          <Link
            key={item.id}
            to={`/category/characterDesign/${item.id}`}
            state={{ post: item }}
          >
            <Card className="group overflow-hidden border-none bg-transparent cursor-pointer p-0 m-0 rounded-sm">
              <CardContent className="relative p-0 m-0 pb-[100%]">
                <img
                  src={item.src}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 m-0">
                  <div className="transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out">
                    <div className="flex items-center gap-3 m-0 p-0">
                      <Avatar className="h-12 w-12 border border-myaccent m-0 p-0">
                        <AvatarImage src={item.avatar} />
                        <AvatarFallback>{item.artist.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="m-0 p-0">
                        <p className="text-white text-lg font-medium m-0 p-0">
                          {item.artist}
                        </p>
                        <p className="text-gray-400 text-sm m-0 p-0">
                          ♥️ {item.likes} likes
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))} */}
      </div>
    </div>
  );
}

export default Gallery;
