import { Box, Button, Divider, Flex, Group, Image, LoadingOverlay, Paper, Stack, Text, TextInput, Title, useMantineTheme } from '@mantine/core'
import { FC, useState } from 'react'
import { useStyles } from './signup.styles'
import { IconBrandGoogle, IconInfoCircle } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { notifications } from '@mantine/notifications';
import { supabase } from '../../api/supabase'
import { AuthError } from '@supabase/supabase-js'
import { useStore } from '../../store'
import { useMediaQuery } from '@mantine/hooks'

export const SignupPage: FC = () => {
  const matches = useMediaQuery('(min-width: 50rem)');
  const theme = useMantineTheme()
  const setToken = useStore(state => state.setToken)
  const { classes } = useStyles()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  })
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
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: 'https://shamhu-film-hub.vercel.app/login',
          data: {
            full_name: formData.fullName
          }
        },
      })
      if(error) {
        setError(error)
        setLoading(false)
        return
      }
      setLoading(false)
      notifications.show({
        withCloseButton: true,
        autoClose: 4000,
        title: "Link sent!",
        message: 'Check your email to verify your email address',
        color: 'primary',
        
      });
      
    } catch (err) {
      setLoading(false)
      alert(err)
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
      {matches && (
      <Box className={classes.img}>
        <Image src="/images/move_wallpaper.jpg" height="100vh" alt="img"/>
      </Box>
      )}
      <Flex justify="center" align="center" direction="column">
        <Paper shadow='xl' radius="md" py="md" px="xl" maw="100%" pos="relative" className={classes.form}>
        <LoadingOverlay visible={loading} overlayBlur={2} overlayOpacity={0.3} sx={theme => ({ borderRadius: theme.radius.md })}/>
          <Group position='center' mt="xs">
            <IconInfoCircle color={theme.colors.purple[4]} size="2rem"/>
          </Group>
          <Title align='center' order={4} py="sm">Sign Up</Title>
          <Text align='center'>Sign up with Google Account you use daily</Text>
          <Button fullWidth my="lg" onClick={loginWithGoogle} leftIcon={<IconBrandGoogle color='white'/>}>Continue With Google</Button>
          <Divider label="Or" labelPosition='center'/>
          <form onSubmit={signInWithEmail}>
            <Stack spacing="xs">
              <TextInput onChange={handleChange} name="fullName" required label="Full Name" placeholder='Enter your full name' variant='filled' withAsterisk={false} />
              <TextInput onChange={handleChange} name="email" required label="Email" placeholder='yourname@yourcompany.com' type='email' variant='filled' withAsterisk={false} />
              <TextInput error={error?.message} onChange={handleChange} name="password" required label="Password" placeholder='Enter your password' type='password' variant='filled' withAsterisk={false}/>
              <Button type='submit' fullWidth>Continue With Email</Button>
            </Stack>
          </form>
        </Paper>
        <Text py="md">Already have and account? <Text component={Link} to='/login' sx={{ color: theme.colors.purple[4], cursor: "pointer" }}>Log In</Text></Text>
      </Flex>
    </Group>
  )
}