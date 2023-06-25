import { StateCreator } from "zustand"
import { ClientStateSlice } from "./client-state"
import { persist } from "zustand/middleware"
import { User } from "@supabase/supabase-js"

export interface AuthSlice {
  token: string | null,
  user: User | null
  setToken: (token: string | null) => void
  setUser: (user: User | null) => void
}

export const createAuthSlice: StateCreator<
  AuthSlice & ClientStateSlice,
  [],
  [["zustand/persist", AuthSlice]],
  AuthSlice
  > = persist((set) => ({
  token: "",
  user: null,
  setToken: token => set(() => ({ token })),
  setUser: user => set(() => ({ user }))
}), {
  name: "auth-storage"
})