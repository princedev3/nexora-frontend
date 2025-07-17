import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ProductCartType = {
  name: string;
  id: string;
  price: number;
  image: string;
  category:string;
  quantity: number;
  initialQuantity: number;
};

type CartType = {
  products: ProductCartType[];
  totalPrice: number;
  totalItems: number;
  addToCart: (item: ProductCartType) => void;
  removeFromCart: (item: ProductCartType) => void;
  incrementQuantity: (id: string) => void;
   decrementQuantity: (id: string) => void;
  clearCart: () => void;
};

const INITIAL_STATE = {
  products: [],
  totalPrice: 0,
  totalItems: 0,
};

export const useCartStore = create(
  persist<CartType>(
    (set, get) => ({
      products: INITIAL_STATE.products,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      addToCart: (item: ProductCartType) => {
        const productsInstate = get().products;
        const findProduct = productsInstate.find((each) => each.id === item.id);
        if (findProduct) {
          const updatedProduct = productsInstate.map((each) =>
            each.id === findProduct.id
              ? {
                  ...findProduct,
                  price: findProduct.price + item.price,
                  quantity: findProduct.quantity + item.quantity,
                }
              : each
          );
          set((state) => ({
            products: updatedProduct,
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));
        } else {
          set((state) => ({
            products: [...state.products, item],
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));
        }
      },
      removeFromCart: (item: ProductCartType) => {
        set((state) => ({
          products: state.products.filter((product) => product.id !== item.id),
          totalItems: state.totalItems - item.quantity,
          totalPrice: state.totalPrice - item.price,
        }));
      },
      clearCart: () => set({ products: [], totalItems: 0, totalPrice: 0 }),
    incrementQuantity: (id: string) =>
  set((state) => {
    const product = state.products.find((p) => p.id === id);
    if (!product) return state;

    const unitPrice = product.price / product.quantity;

    return {
      products: state.products.map((p) =>
        p.id === id
          ? {
              ...p,
              quantity: p.quantity + 1,
              price: product.price + unitPrice, 
            }
          : p
      ),
      totalItems: state.totalItems + 1,
      totalPrice: state.totalPrice + unitPrice, 
    };
  }),

        decrementQuantity: (id: string) =>
  set((state) => {
    const updatedProducts = state.products.map((p) => {
      if (p.id === id && p.quantity > 1) {
        const unitPrice = p.price / p.quantity;
        return {
          ...p,
          quantity: p.quantity - 1,
          price: unitPrice * (p.quantity - 1),
        };
      }
      return p;
    });

    const targetProduct = state.products.find((p) => p.id === id);
    if (targetProduct && targetProduct.quantity > 1) {
      const unitPrice = targetProduct.price / targetProduct.quantity;
      return {
        products: updatedProducts,
        totalItems: state.totalItems - 1,
        totalPrice: state.totalPrice - unitPrice,
      };
    }

    return state; 
  }),

    }),
    { skipHydration: true, name: "cart-store" }
  )
);
