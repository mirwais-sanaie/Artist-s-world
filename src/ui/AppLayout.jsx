/* eslint-disable no-undef */
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { ToastContainer } from "react-toastify";

function AppLayout() {
  return (
    <div className="bg-primary min-h-screen text-white px-2 md:px-6">
      <Header />
      <main>
        <Outlet />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          // transition={Bounce}
        />
      </main>
    </div>
  );
}

export default AppLayout;
