/* eslint-disable react-refresh/only-export-components */
import { useContext, useState } from "react";
import { createContext } from "react";

const AuthContext = createContext();

function AuthContextProv({ children }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        openModal,
        setOpenModal,
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
