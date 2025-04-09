import { Outlet } from "react-router-dom";
import CarouselSlider from "../ui/CarouselSlider";
import CategorySlider from "../ui/CategorySlider";

function Home() {
  return (
    <div className="w-full">
      <CarouselSlider />
      <CategorySlider />
      <Outlet />
    </div>
  );
}

export default Home;
