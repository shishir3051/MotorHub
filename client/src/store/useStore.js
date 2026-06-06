// client/src/store/useStore.js
import { create } from 'zustand';
import {
  clearSession,
  getCart,
  getSession,
  saveCart,
  setSession,
} from '../utils/session';

export const useStore = create((set, get) => ({
  cart: getCart(),
  user: null,
  token: null,
  sessionContext: 'customer',
  hasAdminSession: Boolean(getSession('admin')?.token),
  hasCustomerSession: Boolean(getSession('customer')?.token),

  addToCart: (motorcycle) => set((state) => {
    const existing = state.cart.find((item) => item._id === motorcycle._id);
    const cart = existing
      ? state.cart.map((item) =>
          item._id === motorcycle._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...state.cart, { ...motorcycle, quantity: 1 }];
    saveCart(cart);
    return { cart };
  }),

  removeFromCart: (motorcycleId) => set((state) => {
    const cart = state.cart.filter((item) => item._id !== motorcycleId);
    saveCart(cart);
    return { cart };
  }),

  updateCartQuantity: (motorcycleId, quantity) => set((state) => {
    const cart = state.cart.map((item) =>
      item._id === motorcycleId ? { ...item, quantity } : item
    );
    saveCart(cart);
    return { cart };
  }),

  clearCart: () => {
    saveCart([]);
    set({ cart: [] });
  },

  setAuth: (context, user, token) => {
    setSession(context, { user, token });
    set({
      sessionContext: context,
      user,
      token,
      hasAdminSession: context === 'admin' ? true : Boolean(getSession('admin')?.token),
      hasCustomerSession: context === 'customer' ? true : Boolean(getSession('customer')?.token),
    });
  },

  loadSession: (context) => {
    const session = getSession(context);
    if (session?.token) {
      set({
        sessionContext: context,
        user: session.user,
        token: session.token,
        hasAdminSession: Boolean(getSession('admin')?.token),
        hasCustomerSession: Boolean(getSession('customer')?.token),
        cart: context === 'customer' ? getCart() : get().cart,
      });
      return session;
    }

    set({
      sessionContext: context,
      user: null,
      token: null,
      hasAdminSession: Boolean(getSession('admin')?.token),
      hasCustomerSession: Boolean(getSession('customer')?.token),
    });
    return null;
  },

  refreshSessionFlags: () => set({
    hasAdminSession: Boolean(getSession('admin')?.token),
    hasCustomerSession: Boolean(getSession('customer')?.token),
  }),

  logout: (context) => {
    const ctx = context || get().sessionContext;
    clearSession(ctx);

    const updates = {
      hasAdminSession: Boolean(getSession('admin')?.token),
      hasCustomerSession: Boolean(getSession('customer')?.token),
    };

    if (get().sessionContext === ctx) {
      Object.assign(updates, {
        user: null,
        token: null,
        ...(ctx === 'customer' ? { cart: [] } : {}),
      });
    }

    set(updates);
  },
}));
