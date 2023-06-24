import { create } from 'zustand'
import { AuthSlice, createAuthSlice } from './storeSlices/auth-state'
import { ClientStateSlice, createClientStateSlice } from './storeSlices/client-state'


export const useStore = create<AuthSlice & ClientStateSlice>()((...a) => ({
  ...createAuthSlice(...a),
  ...createClientStateSlice(...a)
}))