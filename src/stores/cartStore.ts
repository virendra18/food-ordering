import { ProductWithQuantity } from "@/types/Product";
import { Products } from "@prisma/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartState {
  cartItems: ProductWithQuantity[];
  addItemToCart: (item: ProductWithQuantity) => void;
  removeItemFromCart: (itemId: string) => void;
  emptyCart: () => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
}

const useCart = create(
  persist<CartState>(
    (set, get) => ({
      cartItems: [],
      addItemToCart: (item) => {
        const itemExists = get().cartItems.find(
          (cartItem) => cartItem.id === item.id
        );

        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            itemExists.quantity++;
          }

          set({ cartItems: [...get().cartItems] });
        } else {
          set({ cartItems: [...get().cartItems, { ...item, quantity: 1 }] });
        }
      },
      removeItemFromCart: (itemId) => {
        const itemExists = get().cartItems.find(
          (cartItem) => cartItem.id === itemId
        );

        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            const updatedCartItems = get().cartItems.filter(
              (item) => item.id !== itemId
            );
            set({ cartItems: updatedCartItems });
          }
        }
      },
      emptyCart: () => set({ cartItems: [] }),
      increaseQuantity: (itemId) => {
        const itemExists = get().cartItems.find(
          (cartItem) => cartItem.id === itemId
        );

        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            itemExists.quantity++;
          }

          set({ cartItems: [...get().cartItems] });
        }
      },
      decreaseQuantity: (itemId) => {
        const itemExists = get().cartItems.find(
          (cartItem) => cartItem.id === itemId
        );

        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            if (itemExists.quantity === 1) {
              const updatedCartItems = get().cartItems.filter(
                (item) => item.id !== itemId
              );
              set({ cartItems: updatedCartItems });
            } else {
              itemExists.quantity--;
              set({ cartItems: [...get().cartItems] });
            }
          }
        }
      },
    }),
    {
      name: "cart-items", // name of the item in the storage (must be unique)
    }
  )
);

export default useCart;

// export const useBearStore = create(
//   persist(
//     (set, get) => ({
//       bears: 0,
//       addABear: () => set({ bears: get().bears + 1 }),
//     }),
//     {
//       name: "food-storage", // name of the item in the storage (must be unique)
//       storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
//     }
//   )
// );
