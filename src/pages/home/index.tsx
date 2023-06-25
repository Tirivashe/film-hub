import { FC } from 'react'
import Dashboard from '../../components/Dashboard'
import { SearchResults } from '../search'
import { useStore } from '../../store'

export const HomePage: FC = () => {
  const query = useStore(state => state.query)
  return (
    query ? <SearchResults /> : <Dashboard />
  )
}
