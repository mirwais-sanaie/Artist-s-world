import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { NavLink } from "react-router-dom";

function CategorySlider() {
  const categories = [
    { id: 1, name: "Character Design", image: "🎨", link: "characterDesign" },
    { id: 2, name: "3d Substance", image: "🏞️", link: "substance" },
    { id: 3, name: "Game AI", image: "✏️", link: "gameAI" },
    { id: 4, name: "Illustration", image: "🖥️", link: "illustration" },
    { id: 5, name: "Story board", image: "🖌️", link: "storyboard" },
    { id: 6, name: "Concept idea", image: "🖼️", link: "conceptidea" },
    { id: 7, name: "Environment", image: "📱", link: "environment" },
    { id: 8, name: "Digital pictures", image: "😐", link: "digitalpictures" },
  ];

  return (
    <div className="w-full mx-auto">
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {categories.map((category) => (
            <CarouselItem key={category.id} className="pl-1 basis-auto">
              <div className="p-1">
                <NavLink
                  to={category.link}
                  className={({ isActive }) =>
                    `flex cursor-pointer items-center gap-3 px-4 py-3.5 md:py-3 rounded-lg transition-colors w-full max-w-xs ${
                      isActive
                        ? "bg-myGray-muted"
                        : "bg-myGray-dark hover:bg-myGray-muted"
                    }`
                  }
                >
                  <span className="text-2xl">{category.image}</span>
                  <span className="text-white text-md font-medium truncate">
                    {category.name}
                  </span>
                </NavLink>
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
