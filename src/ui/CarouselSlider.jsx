import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CarouselSlider = () => {
  const artworks = Array.from({ length: 5 }).map((_, i) => ({
    id: i + 1,
    title: `Artwork ${i + 1}`,
    artist: `Artist ${i + 1}`,
    likes: Math.floor(Math.random() * 1000),
  }));

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {artworks.map((artwork) => (
          <CarouselItem
            key={artwork.id}
            className="basis-full sm:basis-1/2 lg:basis-1/3"
          >
            <Card className="border-none bg-transparent group">
              <CardContent className="relative p-0 overflow-hidden rounded-lg aspect-[3/1.6]">
                {/* Image with scale on hover */}
                <img
                  src={`https://picsum.photos/id/${artwork.id + 70}/600/400`}
                  alt={artwork.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-115"
                />

                {/* Fixed dark overlay at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h3 className="text-white text-3xl font-bold truncate">
                    {artwork.title}
                  </h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-lg font-bold text-myGray-muted">
                      {artwork.artist}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="left-2 h-10 w-10 bg-black/50 hover:bg-black/70 text-white border-none" />
      <CarouselNext className="right-2 h-10 w-10 bg-black/50 hover:bg-black/70 text-white border-none" />
    </Carousel>
  );
};

export default CarouselSlider;
