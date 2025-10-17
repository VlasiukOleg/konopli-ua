import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoriteStore {
  favoriteIds: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
}

export const useFavorite = create<FavoriteStore>()(
  persist(
    (set) => ({
      favoriteIds: [],
      addFavorite: (id) =>
        set((state) => ({
          favoriteIds: [...state.favoriteIds, id],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.filter(
            (favoriteId) => favoriteId !== id
          ),
        })),

      clearFavorites: () => set({ favoriteIds: [] }),
    }),
    { name: "favorite-storage" }
  )
);
