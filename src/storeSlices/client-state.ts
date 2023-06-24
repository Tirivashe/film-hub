import { StateCreator } from "zustand"
import { AuthSlice } from "./auth-state"

export interface ClientStateSlice {
  isNavOpen: boolean,
  query: string,
  queryChange: (value: string) => void
  clearQuery: () => void,
  toggleNav: () => void
}

export const createClientStateSlice: StateCreator<
  AuthSlice & ClientStateSlice,
  [],
  [],
  ClientStateSlice
  > = (set) => ({
  isNavOpen: false,
  query: "",
  toggleNav: () => set(state => ({ isNavOpen: !state.isNavOpen })),
  queryChange: value => set(() => ({ query: value })),
  clearQuery: () => set(() => ({ query: "" })),
})