import { AppShell } from '@mantine/core'
import { FC } from 'react'
import Dashboard from '../../components/Dashboard'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import { SearchResults } from '../search'
import { useStore } from '../../store'
import { useStyles } from './appshell.styles'

export const HomePage: FC = () => {
  const query = useStore(state => state.query)
  const { classes } = useStyles()
  return (
    <AppShell
      navbar={<Navbar />}
      header={<Header />}
      navbarOffsetBreakpoint="md"
      className={classes.root}
    >
      { query ? <SearchResults /> : <Dashboard /> }
    </AppShell>
  )
}
