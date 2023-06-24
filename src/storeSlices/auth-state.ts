import { StateCreator } from "zustand"
import { ClientStateSlice } from "./client-state"
import { persist } from "zustand/middleware"

export interface AuthSlice {
  token: string,
  setToken: (token: string) => void
}

export const createAuthSlice: StateCreator<
  AuthSlice & ClientStateSlice,
  [],
  [["zustand/persist", AuthSlice]],
  AuthSlice
  > = persist((set) => ({
  token: "",
  setToken: token => set(() => ({ token }))
}), {
  name: "auth-storage"
})