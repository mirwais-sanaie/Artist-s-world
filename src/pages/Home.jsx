import { Outlet } from "react-router-dom";
import CarouselSlider from "../ui/CarouselSlider";
import CategorySlider from "../ui/CategorySlider";
import { useAuthContext } from "@/contexts/AuthContextProv";
import SignIn from "../ui/SignIn";
import SignUp from "../ui/SignUp";

function Home() {
  const { openSignUp, openSignIn } = useAuthContext();

  return (
    <div className="w-full">
      <CarouselSlider />
      <CategorySlider />

      {openSignIn && <SignIn />}
      {openSignUp && <SignUp />}

      <Outlet />
    </div>
  );
}

export default Home;
