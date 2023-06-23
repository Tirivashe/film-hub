import { Box, Button, Divider, Flex, Group, Image, Paper, Text, TextInput, Title, useMantineTheme } from '@mantine/core'
import { FC } from 'react'
import { useStyles } from './signup.styles'
import { IconBrandGoogle, IconInfoCircle } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

export const SignupPage: FC = () => {
  const theme = useMantineTheme()
  const { classes } = useStyles()
  return (
    <Group spacing={0} h="100vh" grow position='center' align='center'>
      <Box className={classes.img}>
        <Image src="/public/images/move_wallpaper.jpg" height="100vh" alt="img"/>
      </Box>
      <Flex justify="center" align="center" direction="column">
        <Paper shadow='xl' radius="md" py="md" px="xl" miw="40%" className={classes.form}>
          <Group position='center' mt="xs">
            <IconInfoCircle color={theme.colors.purple[4]} size="2rem"/>
          </Group>
          <Title align='center' order={4} py="sm">Sign Up</Title>
          <Text align='center'>Sign up with Google Account you use daily</Text>
          <Button fullWidth my="lg" leftIcon={<IconBrandGoogle color='white'/>}>Continue With Google</Button>
          <Divider label="Or" labelPosition='center'/>
          <form>
            <TextInput required label="Email" placeholder='Enter your email address' type='email' variant='filled' pt="md" pb="lg" withAsterisk={false} />
            <Button type='submit' fullWidth>Continue with email</Button>
          </form>
        </Paper>
        <Text py="md">Already have and account? <Text component={Link} to='/login' sx={{ color: theme.colors.purple[4], cursor: "pointer" }}>Log In</Text></Text>
      </Flex>
    </Group>
  )
}