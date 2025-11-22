import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      role: null,
      isLoggedIn: false,

      login: (userData) => {
        set({
          user: userData,
          role: userData.role,
          isLoggedIn: true
        });
      },

      logout: () => {
        set({
          user: null,
          role: null,
          isLoggedIn: false
        });
        localStorage.clear();
      },

      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData }
        }));
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);

export default useAuthStore;
