import * as React from 'react'
import {
  Link,
  Outlet,
  createFileRoute,
  redirect,
  useRouter,
} from '@tanstack/react-router'
import { pb } from '../pb'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context, location }) => {
    if (!pb.authStore.isValid) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: AuthLayout,
})

function AuthLayout() {
  const router = useRouter()
  const navigate = Route.useNavigate()

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      pb.authStore.clear()
      router.invalidate().finally(() => {
        navigate({ to: '/' })
      })
    }
  }

  return (
    <div className="h-full">
      <div className='p-2 bg-green-200'>

        <ul className="max-w-5xl mx-auto py-2 flex gap-8">

          <li>
            <Link
              to="/recipes/"
              className="hover:underline uppercase font-bold"
            >
              <span dangerouslySetInnerHTML={{ __html: import.meta.env.VITE_HEADER }}></span>
            </Link>
          </li>
          <li className='ml-auto'>
            <Link
              to="/recipes/add"
              className="hover:underline"
            >
              + Add
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="hover:underline"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div className='p-2 max-w-5xl mx-auto h-full'>
        <Outlet />
      </div>
      <div className='py-4 bg-teal-200'>
        <div className='max-w-5xl mx-auto text-center '>
          <span dangerouslySetInnerHTML={{ __html: import.meta.env.VITE_FOOTER }}></span>
        </div>
      </div>
    </div>
  )
}
