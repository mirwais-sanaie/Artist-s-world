import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContextProv } from "./contexts/AuthContextProv";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import Spinner from "./ui/Spinner";
import FirstLoader from "./ui/FirstLoader";
import { ToastContainer } from "react-toastify";

const AppLayout = lazy(() => import("./ui/AppLayout"));
const Home = lazy(() => import("./pages/Home"));
const CharacterDesign = lazy(() => import("./ui/CharacterDesign"));
const Post = lazy(() => import("./features/posts/Post"));
const CreatePost = lazy(() => import("./features/posts/CreatePost"));
const EnvironmentArt = lazy(() => import("./ui/EnvironmentArt"));
const Substance = lazy(() => import("./ui/Substance"));
const Illustration = lazy(() => import("./ui/Illustration"));
const Storyboard = lazy(() => import("./ui/StoryBoard"));
const ConceptIdea = lazy(() => import("./ui/ConceptIdea"));
const DigitalPictures = lazy(() => import("./ui/DigitalPictures"));
const PostJobs = lazy(() => import("./features/jobs/PostJobs"));
const FindJobs = lazy(() => import("./features/jobs/FindJobs"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Jobs = lazy(() => import("./pages/Jobs"));
const Cart = lazy(() => import("./pages/Cart"));
const User = lazy(() => import("./pages/User"));

const queryClient = new QueryClient({
  defaultOptions: {
    staleTime: 0,
  },
});

function App() {
  return (
    <Suspense fallback={<FirstLoader />}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProv>
          <ReactQueryDevtools initialIsOpen={false} />

          <Routes>
            <Route element={<AppLayout />}>
              <Route
                index
                element={<Navigate to="/category/characterDesign" replace />}
              />
              <Route path="category" element={<Home />}>
                <Route
                  path="characterDesign"
                  element={
                    <Suspense fallback={<Spinner />}>
                      <CharacterDesign />
                    </Suspense>
                  }
                />
                <Route
                  path="substance"
                  element={
                    <Suspense fallback={<Spinner />}>
                      <Substance />
                    </Suspense>
                  }
                />
                <Route
                  path="illustration"
                  element={
                    <Suspense fallback={<Spinner />}>
                      <Illustration />
                    </Suspense>
                  }
                />
                <Route
                  path="storyboard"
                  element={
                    <Suspense fallback={<Spinner />}>
                      <Storyboard />
                    </Suspense>
                  }
                />
                <Route
                  path="conceptidea"
                  element={
                    <Suspense fallback={<Spinner />}>
                      <ConceptIdea />
                    </Suspense>
                  }
                />
                <Route
                  path="environment"
                  element={
                    <Suspense fallback={<Spinner />}>
                      <EnvironmentArt />
                    </Suspense>
                  }
                />
                <Route
                  path="digitalpictures"
                  element={
                    <Suspense fallback={<Spinner />}>
                      <DigitalPictures />
                    </Suspense>
                  }
                />

                <Route
                  path="/category/characterDesign/:id"
                  element={<Post />}
                />
              </Route>

              <Route path="about" element={<AboutUs />} />
              <Route path="jobs" element={<Jobs />}>
                <Route path="postJobs" element={<PostJobs />} />
                <Route path="findJobs" element={<FindJobs />} />
              </Route>

              <Route path="cart" element={<Cart />} />
              <Route path="user" element={<User />} />
              <Route path="createpost" element={<CreatePost />} />
            </Route>
          </Routes>
        </AuthContextProv>
      </QueryClientProvider>

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
      />
    </Suspense>
  );
}

export default App;
