import { IconChevronRight, IconChevronLeft, IconLogout } from '@tabler/icons-react';
import { UnstyledButton, Group, Avatar, Text, Box, useMantineTheme, rem, Menu } from '@mantine/core';
import { FC } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../../api/supabase';
import { useStore } from '../../store';

type Props = {
  user?: User | null;
}

export const LoggedInUser:FC<Props> = ({ user }) => {
  const theme = useMantineTheme();
  const setToken = useStore(state => state.setToken)
  const setUser = useStore(state => state.setUser)
  const initials = user?.user_metadata["full_name"].split(" ").map((n: string) => n[0]).join("")

  const logOutUser = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if(error) throw error
      setToken(null)
      setUser(null)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `${rem(1)} solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
      }}
    >
      <Menu width={150}>
        <Menu.Target>
          <UnstyledButton
            sx={{
              display: 'block',
              width: '100%',
              padding: theme.spacing.xs,
              borderRadius: theme.radius.sm,
              color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

              '&:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
              },
            }}
          >
            <Group>
              <Avatar
                color='primary'
                src={ user?.user_metadata["avatar_url"] || null}
                radius="xl"
              >
                { initials }
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Text size="sm" weight={500} truncate>
                  { user?.user_metadata["full_name"] }
                </Text>
                <Text color="dimmed" size="xs" truncate>
                  { user?.email }
                </Text>
              </Box>

              {theme.dir === 'ltr' ? (
                <IconChevronRight size={rem(18)} />
              ) : (
                <IconChevronLeft size={rem(18)} />
              )}
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item onClick={logOutUser} color="red" icon={<IconLogout size={14} />}>Log out</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
}