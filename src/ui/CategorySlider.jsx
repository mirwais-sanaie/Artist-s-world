import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function CategorySlider() {
  const categories = [
    { id: 1, name: "Character Design", image: "🎨" },
    { id: 2, name: "Environment Art", image: "🏞️" },
    { id: 3, name: "Concept Art", image: "✏️" },
    { id: 4, name: "3D Modeling", image: "🖥️" },
    { id: 5, name: "Digital Painting", image: "🖌️" },
    { id: 6, name: "Illustration", image: "🖼️" },
    { id: 7, name: "UI/UX Design", image: "📱" },
    { id: 8, name: "UI/UX Design", image: "📱" },
    { id: 9, name: "UI/UX Design", image: "📱" },
    { id: 10, name: "UI/UX Design", image: "📱" },
    { id: 11, name: "UI/UX Design", image: "📱" },
  ];

  return (
    <div className="w-full mx-auto">
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {categories.map((category) => (
            <CarouselItem key={category.id} className="pl-1 basis-auto ">
              <div className="p-1">
                <button className="flex cursor-pointer items-center gap-3 px-4 py-3.5 md:py-3 rounded-lg bg-myGray-dark hover:bg-myGray-muted transition-colors  w-full max-w-xs">
                  <span className="text-2xl">{category.image}</span>
                  <span className="text-white text-md font-medium truncate">
                    {category.name}
                  </span>
                </button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 h-10 w-10 bg-black/50 hover:bg-black/70 text-white border-none" />
        <CarouselNext className="right-2 h-10 w-10 bg-black/50 hover:bg-black/70 text-white border-none" />
      </Carousel>
    </div>
  );
}

export default CategorySlider;
