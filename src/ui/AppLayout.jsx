import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="bg-primary h-screen text-white">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
