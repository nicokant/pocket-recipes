import * as React from 'react'
import {
  createFileRoute,
  redirect,
  useRouter,
  useRouterState,
} from '@tanstack/react-router'
import { z } from 'zod'
import { pb } from '../pb'

// eslint-disable-next-line ts/no-unnecessary-type-assertion
const fallback = '/recipes/' as const

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context, search }) => {
    if (pb.authStore.isValid) {
      throw redirect({ to: search.redirect || fallback })
    }
  },
  component: LoginComponent,
})

function LoginComponent() {
  const router = useRouter()
  const isLoading = useRouterState({ select: (s) => s.isLoading })
  const navigate = Route.useNavigate()
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const search = Route.useSearch()

  const onFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    setIsSubmitting(true)
    try {
      const data = new FormData(evt.currentTarget)
      const userField = data.get('username')
      const passField = data.get('password')

      if (!userField || !passField) return
      const username = userField.toString()
      const pass = passField.toString()

      const auth = await pb.collection('users').authWithPassword(username, pass);
      console.log(auth)

      await router.invalidate()

      // This is just a hack being used to wait for the auth state to update
      // in a real app, you'd want to use a more robust solution
      // await sleep(1)

      await navigate({ to: search.redirect || fallback })
    } catch (error) {
      console.error('Error logging in: ', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isLoggingIn = isLoading || isSubmitting

  return (
    <div className="p-2 grid gap-2 place-items-center">
      <h3 className="text-xl">Login page</h3>
      {search.redirect ? (
        <p className="text-red-500">You need to login to access this page.</p>
      ) : (
        <p>Login to see all the cool content in here.</p>
      )}
      <form className="mt-4 max-w-lg" onSubmit={onFormSubmit}>
        <fieldset disabled={isLoggingIn} className="w-full grid gap-2">
          <div className="grid gap-2 items-center min-w-[300px]">
            <label htmlFor="username-input" className="text-sm font-medium">
              Username
            </label>
            <input
              id="username-input"
              name="username"
              placeholder="Enter your name"
              type="text"
              className="border rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="grid gap-2 items-center min-w-[300px]">
            <label htmlFor="password-input" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password-input"
              name="password"
              placeholder="Enter your password"
              type="psasword"
              className="border rounded-md p-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md w-full disabled:bg-gray-300 disabled:text-gray-500"
          >
            {isLoggingIn ? 'Loading...' : 'Login'}
          </button>
        </fieldset>
      </form>
    </div>
  )
}
