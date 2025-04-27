import { useForm } from '@mantine/form'
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'

import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: LoginForm,
})

function LoginForm() {
  const navigate = useNavigate()

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length >= 6 ? null : 'Password must be at least 6 characters',
    },
  })

  const handleSubmit = async (values: typeof form.values) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      notifications.show({
        title: 'Login successful',
        message: 'You have been logged in successfully',
        color: 'green',
      })

      console.log(values)

      navigate({ to: '/dashboard' })
    } catch (error) {
      notifications.show({
        title: 'Login failed',
        message: 'Invalid credentials',
        color: 'red',
      })
    }
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center" style={{ fontFamily: 'Greycliff CF, sans-serif' }}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor
          size="sm"
          component="button"
          onClick={() => navigate({ to: '/' })}
        >
          /register Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            required
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps('password')}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox
              label="Remember me"
              {...form.getInputProps('remember', { type: 'checkbox' })}
            />
            <Anchor
              component="button"
              size="sm"
              onClick={() => navigate({ to: '/' })}
            >
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit" loading={false}>
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
