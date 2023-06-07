import { AppShell } from '@mantine/core'
import { FC } from 'react'
import Dashboard from '../../components/Dashboard'
import MoviesByGenre from '../../components/MoviesByGenre'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import { useStore } from '../../store'


export const HomePage: FC = () => {
  const isGenresOpen = useStore(state => state.isGenresOpen)
  return (
    <AppShell
      navbar={<Navbar />}
      header={<Header />}
      navbarOffsetBreakpoint="md"
    >
      {isGenresOpen ? <MoviesByGenre /> : <Dashboard />}
    </AppShell>
  )
}
