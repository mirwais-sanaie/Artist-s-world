import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CarouselSlider = () => {
  const artworks = [
    {
      id: 1,
      title: "Cyberpunk Cityscape",
      description:
        "A futuristic neon-lit city blending dystopia with digital dreams.",
      imageUrl: "../../public/3d.png",
    },
    {
      id: 2,
      title: "Ancient Mech Warrior",
      description: "A colossal mech buried in the sands of time.",
      imageUrl: "../../public/3d_2.png",
    },
    {
      id: 3,
      title: "Floating Island Temple",
      description:
        "A peaceful shrine resting atop a floating island, defying gravity.",
      imageUrl: "../../public/3d_5.png",
    },
    {
      id: 4,
      title: "Alien Biolab",
      description:
        "A mysterious alien lab filled with glowing flora and eerie silence.",
      imageUrl: "../../public/3d_4.png",
    },
    {
      id: 5,
      title: "Digital Dreamscape",
      description:
        "A surreal 3D landscape where imagination meets rendering power.",
      imageUrl: "../../public/3d_3.png",
    },
  ];

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
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h3 className="text-white text-2xl font-semibold truncate">
                    {artwork.title}
                  </h3>
                  <p className="text-sm text-gray-300 mt-1 line-clamp-2">
                    {artwork.description}
                  </p>
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
