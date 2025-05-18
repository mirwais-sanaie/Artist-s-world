import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Companies from "./pages/Companies";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Cart from "./pages/Cart";
import User from "./pages/User";
import CharacterDesign from "./ui/CharacterDesign";
import { AuthContextProv } from "./contexts/AuthContextProv";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Post from "./features/posts/Post";
import CreatePost from "./features/posts/CreatePost";
import EnvironmentArt from "./ui/EnvironmentArt";
import Substance from "./ui/Substance";
import Illustration from "./ui/Illustration";
import Storyboard from "./ui/StoryBoard";
import ConceptIdea from "./ui/ConceptIdea";
import DigitalPictures from "./ui/DigitalPictures";

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
                <Route path="substance" element={<Substance />} />
                <Route path="illustration" element={<Illustration />} />
                <Route path="storyboard" element={<Storyboard />} />
                <Route path="conceptidea" element={<ConceptIdea />} />
                <Route path="environment" element={<EnvironmentArt />} />
                <Route path="digitalpictures" element={<DigitalPictures />} />

                <Route
                  path="/category/characterDesign/:id"
                  element={<Post />}
                />
              </Route>
              <Route path="companies" element={<Companies />} />
              <Route path="jobs" element={<Jobs />} />
              <Route path="cart" element={<Cart />} />
              <Route path="user" element={<User />} />
              <Route path="createpost" element={<CreatePost />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProv>
    </QueryClientProvider>
  );
}

export default App;
