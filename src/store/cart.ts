import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

interface CartStore {
  products: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeProduct: (id: string, size: string) => void;

  //   updateQuantity: (id: string, size: string, quantity: number) => void;

  //   clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      products: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.products.find(
            (i) => i.id === item.id && i.size === item.size
          );
          return {
            products: existing
              ? state.products.map((i) =>
                  i.id === item.id && i.size === item.size
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
                )
              : [...state.products, { ...item, quantity: 1 }],
          };
        }),
      removeProduct: (id, size) =>
        set((state) => ({
          products: state.products.filter(
            (product) => !(product.id === id && product.size === size)
          ),
        })),
    }),
    { name: "cart-storage" }
  )
);
