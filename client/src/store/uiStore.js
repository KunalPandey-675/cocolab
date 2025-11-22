import { create } from 'zustand';

const useUIStore = create((set) => ({
  isFilterModalOpen: false,
  isBoostModalOpen: false,
  isUnlockModalOpen: false,
  selectedCreator: null,

  openFilterModal: () => set({ isFilterModalOpen: true }),
  closeFilterModal: () => set({ isFilterModalOpen: false }),

  openBoostModal: () => set({ isBoostModalOpen: true }),
  closeBoostModal: () => set({ isBoostModalOpen: false }),

  openUnlockModal: (creator) => set({ 
    isUnlockModalOpen: true,
    selectedCreator: creator 
  }),
  closeUnlockModal: () => set({ 
    isUnlockModalOpen: false,
    selectedCreator: null 
  })
}));

export default useUIStore;
