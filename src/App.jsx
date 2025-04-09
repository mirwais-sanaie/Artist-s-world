import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Shop from "./pages/Shop";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Cart from "./pages/Cart";
import User from "./pages/User";
import CharacterDesign from "./ui/CharacterDesign";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            index
            element={<Navigate to="/category/characterDesign" replace />}
          />
          <Route path="category" element={<Home />}>
            <Route path="characterDesign" element={<CharacterDesign />} />
            <Route path="substance" element={<div>Substance</div>} />
            <Route path="gameAI" element={<div>gameAI</div>} />
            <Route path="illustration" element={<div>illustration</div>} />
            <Route path="storyboard" element={<div>storyboard</div>} />
            <Route path="conceptidea" element={<div>conceptidea</div>} />
            <Route path="environment" element={<div>environment</div>} />
            <Route
              path="digitalpainting"
              element={<div>digitalpainting</div>}
            />
          </Route>
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
