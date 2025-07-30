import { create } from 'zustand'
import { UseTestState } from '@/types/stores/test'

export const useTest = create<UseTestState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}))