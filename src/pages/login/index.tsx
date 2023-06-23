import { Box, Button, Divider, Flex, Group, Image, Paper, Text, TextInput, Title, useMantineTheme } from '@mantine/core'
import { FC } from 'react'
import { useStyles } from './login.styles'
import { IconBrandGoogle, IconInfoCircle } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

export const LoginPage: FC = () => {
  const theme = useMantineTheme()
  const { classes } = useStyles()
  return (
    <Group spacing={0} h="100vh" grow position='center' align='center'>
      <Flex justify="center" align="center" direction="column">
        <Paper shadow='xl' radius="md" py="md" px="xl" miw="40%" className={classes.form}>
          <Group position='center' mt="xs">
            <IconInfoCircle color={theme.colors.purple[4]} size="2rem"/>
          </Group>
          <Title align='center' order={4} py="sm">Log In</Title>
          <Text align='center'>Use your work or personal email to log in</Text>
          <Button fullWidth my="lg" leftIcon={<IconBrandGoogle color='white'/>}>Log In With Google</Button>
          <Divider label="Or" labelPosition='center'/>
          <form>
            <TextInput required label="Email" placeholder='yourname@yourcompany.com' type='email' variant='filled' pt="md" pb="lg" withAsterisk={false} />
            <TextInput required label="Password" placeholder='Enter your password' type='password' variant='filled' pb="lg" withAsterisk={false}/>
            <Button type='submit' fullWidth>Log in</Button>
          </form>
        </Paper>
        <Text py="md">Don't have and account yet? <Text component={Link} to='/signup' sx={{ color: theme.colors.purple[4], cursor: "pointer" }}>Sign Up</Text></Text>
      </Flex>
      <Box className={classes.img}>
        <Image src="/public/images/move_wallpaper.jpg" height="100vh" alt="img"/>
      </Box>
    </Group>
  )
}