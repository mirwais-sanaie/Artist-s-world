import { createContext, useContext, useEffect, useState } from "react";
import supabase from "@/services/supabase";

const AuthContext = createContext();

function AuthContextProv({ children }) {
  const [openModal, setOpenModal] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null); // optional, if you need full session data

  //favorite posts functionality
  const [savedPosts, setSavedPosts] = useState([]);

  // Load localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedPosts") || "[]");
    setSavedPosts(stored);
  }, []);
  // Whenever savedPosts changes, update localStorage
  useEffect(() => {
    localStorage.setItem("savedPosts", JSON.stringify(savedPosts));
  }, [savedPosts]);

  const addToSavedPosts = (post) => {
    setSavedPosts((prev) => {
      const exists = prev.find((p) => p.id === post.id);
      if (exists) return prev;
      return [...prev, post];
    });
  };

  const removeFromSavedPosts = (postId) => {
    setSavedPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  // Initialize auth state and listen for changes
  useEffect(() => {
    const initAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error.message);
        return;
      }

      if (data?.session?.user) {
        setUser(data.session.user);
        setSession(data.session);
      }
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        setSession(session);
      } else {
        setUser(null);
        setSession(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        openModal,
        setOpenModal,
        isLogoutOpen,
        setIsLogoutOpen,
        user,
        setUser,
        session, // optional: use if needed
        savedPosts,
        setSavedPosts,
        addToSavedPosts,
        removeFromSavedPosts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProv");
  }
  return context;
}

export { AuthContextProv, useAuthContext };
