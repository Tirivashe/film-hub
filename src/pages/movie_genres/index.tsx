import { AppShell } from '@mantine/core'
import { FC } from 'react'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import MoviesByGenre from '../../components/MoviesByGenre'
import { useLocation, useParams } from 'react-router-dom'

export const MovieGenres: FC = () => {
  const { id } = useParams()
  const { state: { genre } } = useLocation()
  return (
    <AppShell
      navbar={<Navbar />}
      header={<Header />}
      navbarOffsetBreakpoint="md"
    >
      <MoviesByGenre genreId={id} genre={genre}/>
    </AppShell>
  )
}
