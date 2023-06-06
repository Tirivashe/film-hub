import { FC } from 'react'
import { Path, useLocation } from 'react-router-dom';

interface Location extends Path {
  state: Movie;
}

const MovieDetailsPage: FC = () => {
  const { state: movie }: Location = useLocation();

  return (
    <div>{movie.title}</div>
  )
}

export default MovieDetailsPage