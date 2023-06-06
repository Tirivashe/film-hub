import { create } from 'zustand'

interface State {
  genreId: string,
  genre: string,
  isGenresOpen: boolean,
  setGenre: (genreId: string, genre: string) => void
  resetGenre: () => void
  openGenres: () => void
  closeGenres: () => void
}

export const useStore = create<State>((set) => ({
  genreId: "",
  genre: "",
  isGenresOpen: false,
  setGenre: (genreId, genre) => set(() => ({ genreId, genre })),
  resetGenre: () => set(() => ({ genreId: "", genre: "" })),
  openGenres: () => set(() => ({ isGenresOpen: true })),
  closeGenres: () => set(() => ({ isGenresOpen: false }))
}))