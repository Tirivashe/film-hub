import { AppShell } from '@mantine/core'
import { FC } from 'react'
import Dashboard from '../../components/Dashboard'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import { SearchResults } from '../search'
import { useStore } from '../../store'

export const HomePage: FC = () => {
  const query = useStore(state => state.query)
  return (
    <AppShell
      navbar={<Navbar />}
      header={<Header />}
      navbarOffsetBreakpoint="md"
    >
      { query ? <SearchResults /> : <Dashboard /> }
    </AppShell>
  )
}
