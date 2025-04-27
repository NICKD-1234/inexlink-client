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
import { useRouter } from '@tanstack/react-router'

export function LoginForm() {
  const router = useRouter()

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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      notifications.show({
        title: 'Login successful',
        message: 'You have been logged in successfully',
        color: 'green',
      })

      // Redirect after login
      //router.navigate({ to: '/dashboard' })
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
          //onClick={() => router.navigate({ to: '/register' })}
          onClick={() => console.log('clicked')}
        >
          Create account
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
              //onClick={() => router.navigate({ to: '/forgot-password' })}
              onClick={() => console.log('clicked')}
            >
              Forgot password?
            </Anchor>
          </Group>
          <Button
            fullWidth
            mt="xl"
            type="submit"
            loading={
              false
              //form.isSubmitting
            }
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
