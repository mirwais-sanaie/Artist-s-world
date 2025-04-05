import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Shop from "./pages/Shop";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Cart from "./pages/Cart";
import User from "./pages/User";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index path="" element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="cart" element={<Cart />} />
          <Route path="user" element={<User />} />
          <Route path="products/:id" element={<div>Product Details</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
