import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import { Suspense } from "react";
import Spinner from "./Spinner";

function AppLayout() {
  const location = useLocation();
  return (
    <div className="bg-primary min-h-screen text-white px-2 md:px-6">
      <Header />
      <main>
        <Suspense fallback={<Spinner />} key={location.pathname}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

export default AppLayout;
