import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Shop from "./pages/Shop";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Cart from "./pages/Cart";
import User from "./pages/User";
import CharacterDesign from "./ui/CharacterDesign";
import Gallery from "./ui/Gallery";
import { AuthContextProv } from "./contexts/AuthContextProv";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Post from "./features/posts/Post";
import CreatePost from "./features/posts/CreatePost";

const queryClient = new QueryClient({
  defaultOptions: {
    //staleTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 0,
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProv>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route
                index
                element={<Navigate to="/category/characterDesign" replace />}
              />
              <Route path="category" element={<Home />}>
                <Route path="characterDesign" element={<CharacterDesign />} />
                <Route
                  path="/category/characterDesign/:id"
                  element={<Post />}
                />
                <Route
                  path="substance"
                  element={
                    <Gallery text="3d Substance" numImg={10} from={230} />
                  }
                />
                <Route
                  path="gameAI"
                  element={<Gallery text="gameAI" numImg={5} from={240} />}
                />
                <Route
                  path="illustration"
                  element={
                    <Gallery text="illustration" numImg={14} from={250} />
                  }
                />
                <Route
                  path="storyboard"
                  element={<Gallery text="storyboard" numImg={3} from={270} />}
                />
                <Route
                  path="conceptidea"
                  element={<Gallery text="conceptidea" numImg={7} from={275} />}
                />
                <Route
                  path="environment"
                  element={
                    <Gallery text="environment" numImg={11} from={290} />
                  }
                />
                <Route
                  path="digitalpictures"
                  element={
                    <Gallery text="Digital pictures" numImg={9} from={310} />
                  }
                />
              </Route>
              <Route path="shop" element={<Shop />} />
              <Route path="jobs" element={<Jobs />} />
              <Route path="cart" element={<Cart />} />
              <Route path="user" element={<User />} />
              <Route path="createpost" element={<CreatePost />} />
              <Route path="products/:id" element={<div>Product Details</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProv>
    </QueryClientProvider>
  );
}

export default App;
