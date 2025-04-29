import { useContext, useEffect, useState, createContext } from "react";
import supabase from "@/services/supabase";

const AuthContext = createContext();

function AuthContextProv({ children }) {
  const [openModal, setOpenModal] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error.message);
      }

      if (session?.user) {
        setUser(session.user);
      }
    };

    getUser();

    // Listen to auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        openModal,
        setOpenModal,
        user,
        setUser,
        isLogoutOpen,
        setIsLogoutOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
}

export { AuthContextProv, useAuthContext };
