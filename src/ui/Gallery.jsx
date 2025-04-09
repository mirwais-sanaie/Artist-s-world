import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

function Gallery() {
  const galleryItems = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    title: `Artwork ${i + 1}`,
    artist: `Artist ${i + 1}`,
    likes: Math.floor(Math.random() * 1000),
    avatar: `https://randomuser.me/api/portraits/${
      i % 2 === 0 ? "men" : "women"
    }/${i + 10}.jpg`,
  }));

  return (
    <div className="py-8">
      <h1 className="font-bold text-3xl md:text-4xl mb-6">Character Design</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {galleryItems.map((item) => (
          <Card
            key={item.id}
            className="group overflow-hidden border-none bg-transparent"
          >
            <CardContent className="relative p-0 pb-[100%]">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-gray-500">
                <span className="text-lg">Artwork {item.id}</span>

                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out">
                    {/* Artist Info */}
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border border-myaccent">
                        <AvatarImage src={item.avatar} />
                        <AvatarFallback>{item.artist.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-gray-300 text-lg font-medium">
                          {item.artist}
                        </p>
                        <p className="text-gray-400 text-sm">
                          ♥️ {item.likes} likes
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
