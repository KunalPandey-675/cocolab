import { create } from 'zustand';

const useCreatorStore = create((set) => ({
  profile: null,
  analytics: null,
  profileViews: 0,
  viewStats: null,
  loading: false,

  setProfile: (profile) => set({ profile }),

  setAnalytics: (analytics) => set({ analytics }),

  setProfileViews: (profileViews) => set({ profileViews }),

  setViewStats: (viewStats) => set({ viewStats }),

  setLoading: (loading) => set({ loading })
}));

export default useCreatorStore;
