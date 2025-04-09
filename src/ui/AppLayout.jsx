import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="bg-primary min-h-screen text-white px-2 md:px-6">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
