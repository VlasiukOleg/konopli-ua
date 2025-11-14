import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Alert {
  isAlertShow: boolean;
  removeAlert: () => void;
}

export const useAlert = create<Alert>()(
  persist(
    (set) => ({
      isAlertShow: true,
      removeAlert: () => set({ isAlertShow: false }),
    }),
    { name: "alert", storage: createJSONStorage(() => sessionStorage) }
  )
);
