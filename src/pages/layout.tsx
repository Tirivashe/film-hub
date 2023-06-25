import { AppShell } from '@mantine/core'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { supabase } from '../api/supabase'
import { useStore } from '../store'
import { useEffect } from 'react'
import { useStyles } from './appshell.styles'

export const RootLayout: FC = () => {
  const { classes } = useStyles()
  const setToken = useStore(state => state.setToken)
  const setUser = useStore(state => state.setUser)


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
      <Outlet />
    </AppShell>
  )
}
