import { create } from 'zustand'

interface State {
  isNavOpen: boolean,
  toggleNav: () => void
}

export const useStore = create<State>((set) => ({
  isNavOpen: false,
  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
}))