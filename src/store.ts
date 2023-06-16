import { create } from 'zustand'

interface State {
  isNavOpen: boolean,
  query: string,
  queryChange: (value: string) => void
  clearQuery: () => void,
  toggleNav: () => void
}

export const useStore = create<State>((set) => ({
  isNavOpen: false,
  query: "",
  toggleNav: () => set(state => ({ isNavOpen: !state.isNavOpen })),
  queryChange: value => set(() => ({ query: value })),
  clearQuery: () => set(() => ({ query: "" }))
}))