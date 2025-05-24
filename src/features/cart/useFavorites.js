import { useState } from "react";

export function useFavorites() {
  const [Favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  return {
    Favorites,
    setFavorites,
  };
}
