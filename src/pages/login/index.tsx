import { Box, Button, Divider, Flex, Group, Image, LoadingOverlay, Paper, Text, TextInput, Title, useMantineTheme } from '@mantine/core'
import { FC, useState } from 'react'
import { useStyles } from './login.styles'
import { IconBrandGoogle, IconInfoCircle } from '@tabler/icons-react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../api/supabase'
import { AuthError } from '@supabase/supabase-js'
import { useStore } from '../../store'
import { useMediaQuery } from '@mantine/hooks'

export const LoginPage: FC = () => {
  const theme = useMantineTheme()
  const matches = useMediaQuery('(min-width: 50em)');
  const { classes } = useStyles()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const setToken = useStore(state => state.setToken)
  const navigate = useNavigate()
  const [error, setError] = useState<AuthError | null>(null)
  const [loading, setLoading] = useState(false)

  const loginWithGoogle = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'https://shamhu-film-hub.vercel.app/',
        }
      })
      if(error) {
        setError(error)
        return
      }
      setToken(data.url)
    } catch (err) {
      alert(err)
    } finally {
      setLoading(false)
    }
  }

  async function signInWithEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })
      if(error) {
        setError(error)
        return
      }
      setToken(data.session.access_token)
      navigate("/")
    } catch (err) {
      alert(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } =  event?.target as HTMLInputElement
    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    <Group spacing={0} h="100vh" grow position='center' align='center' px="md">
      <Flex justify="center" align="center" direction="column">
        <Paper shadow='xl' radius="md" py="md" px="xl" maw="100%" pos="relative" className={classes.form}>
          <LoadingOverlay visible={loading} overlayBlur={2} overlayOpacity={0.3} sx={theme => ({ borderRadius: theme.radius.md })}/>
          <Group position='center' mt="xs">
            <IconInfoCircle color={theme.colors.purple[4]} size="2rem"/>
          </Group>
          <Title align='center' order={4} py="sm">Log In</Title>
          <Text align='center'>Use your work or personal email to log in</Text>
          <Button fullWidth my="lg" onClick={loginWithGoogle} leftIcon={<IconBrandGoogle color='white'/>}>Log In With Google</Button>
          <Divider label="Or" labelPosition='center'/>
          <form onSubmit={signInWithEmail}>
            <TextInput onChange={handleChange} name="email" required label="Email" placeholder='yourname@yourcompany.com' type='email' variant='filled' pt="md" pb="lg" withAsterisk={false} />
            <TextInput error={error?.message} onChange={handleChange} name="password" required label="Password" placeholder='Enter your password' type='password' variant='filled' pb="lg" withAsterisk={false}/>
            <Button type='submit' fullWidth>Log in</Button>
          </form>
        </Paper>
        <Text py="md">Don't have and account yet? <Text component={Link} to='/signup' sx={{ color: theme.colors.purple[4], cursor: "pointer" }}>Sign Up</Text></Text>
      </Flex>
     {matches && ( 
      <Box className={classes.img}>
        <Image src="/images/move_wallpaper.jpg" height="100vh" alt="img"/>
      </Box>
      )}
    </Group>
  )
}