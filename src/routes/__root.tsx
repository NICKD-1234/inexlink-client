import {
  createRootRouteWithContext,
  redirect,
  Outlet,
} from '@tanstack/react-router'
import { type QueryClient } from '@tanstack/react-query'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const isAuthenticated = async () => {
  return true
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  //Check if user is authenticated
  beforeLoad: async () => {
    const res = await isAuthenticated()
    if (
      !res &&
      window.location.pathname !== '/login' &&
      window.location.pathname !== '/signup'
    ) {
      throw redirect({ to: '/login' })
    } else if (
      res &&
      (window.location.pathname === '/login' ||
        window.location.pathname === '/signup')
    ) {
      throw redirect({ to: '/' })
    }
  },
  component: Component,
})

function Component() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}
