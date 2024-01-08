import { create } from 'zustand';

interface IStoreModalStore {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}

export const useStoreModal = create<IStoreModalStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
