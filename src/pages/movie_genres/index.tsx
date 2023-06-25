import { FC } from 'react'
import MoviesByGenre from '../../components/MoviesByGenre'
import { useLocation, useParams } from 'react-router-dom'
import { useStore } from '../../store'
import { SearchResults } from '../search'

export const MovieGenres: FC = () => {
  const { id } = useParams()
  const query = useStore(state => state.query)
  const { state: { genre } } = useLocation()
  return (
    query ? <SearchResults /> : <MoviesByGenre genreId={id} genre={genre}/>
  )
}
