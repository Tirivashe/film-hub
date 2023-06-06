import { FC } from 'react'

type Props = {
  title: string,
  movies: Movie[] | undefined
}

const MovieList: FC<Props> = ({ movies }) => {
  return (
    <div>MovieList</div>
  )
}

export default MovieList