import { AppShell } from '@mantine/core'
import { FC, useEffect, useState } from 'react'
import Dashboard from '../../components/Dashboard'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import { SearchResults } from '../search'
import { useStore } from '../../store'
import { useStyles } from './appshell.styles'
import { supabase } from '../../api/supabase'

export const HomePage: FC = () => {
  const setToken = useStore(state => state.setToken)
  const setUser = useStore(state => state.setUser)
  
  const query = useStore(state => state.query)
  const { classes } = useStyles()

  useEffect(() => {
    async function getUserSession() {
      const { data: { session } } = await supabase.auth.getSession()
      const { data: { user } } = await supabase.auth.getUser()
      if(session) {
        setToken(session.access_token)
        setUser(user)
      } else {
        setToken(null)
      }
    }
    getUserSession()

  }, [setToken, setUser])

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
