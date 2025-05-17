import { Outlet, useLocation, useParams } from "react-router-dom";
import CarouselSlider from "../ui/CarouselSlider";
import CategorySlider from "../ui/CategorySlider";
import { useAuthContext } from "@/contexts/AuthContextProv";
import SignIn from "../features/authentication/SignIn";
import SignUp from "../features/authentication/SignUp";

function Home() {
  const { openSignUp, openSignIn } = useAuthContext();
  const location = useLocation();
  const params = useParams();
 
  const HIDE_SLIDERS_BASE_PATHS = ["/category/characterDesign", "/other-path"];

  const shouldHideSliders = HIDE_SLIDERS_BASE_PATHS.some(
    (path) => location.pathname.startsWith(path) && params.id
  );

  return (
    <div className="w-full">
      {/* Only show sliders if not on excluded paths with IDs */}
      {!shouldHideSliders && (
        <>
          <CarouselSlider />
          <CategorySlider />
        </>
      )}

      {openSignIn && <SignIn />}
      {openSignUp && <SignUp />}

      <Outlet />
    </div>
  );
}

export default Home;
