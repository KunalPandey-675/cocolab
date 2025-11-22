import { create } from 'zustand';

const useBrandStore = create((set) => ({
  brand: null,
  creators: [],
  filters: {
    platform: '',
    niche: '',
    minFollowers: '',
    maxFollowers: '',
    minEngagement: '',
    location: ''
  },
  loading: false,

  setBrand: (brand) => set({ brand }),

  setCreators: (creators) => set({ creators }),

  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters }
  })),

  resetFilters: () => set({
    filters: {
      platform: '',
      niche: '',
      minFollowers: '',
      maxFollowers: '',
      minEngagement: '',
      location: ''
    }
  }),

  setLoading: (loading) => set({ loading })
}));

export default useBrandStore;
