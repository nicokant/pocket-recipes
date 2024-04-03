import { useMutation, useQueryClient, useQueryErrorResetBoundary, useSuspenseQuery } from '@tanstack/react-query'
import { ErrorComponent, ErrorComponentProps, Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { RecipeNotFoundError, RecipeType } from '../recipes'
import { useEffect } from 'react'
import { recipeQueryOptions } from '../queryOptions';
import RecipeForm from '../components/RecipeForm';
import { pb } from '../pb';


export const Route = createFileRoute('/_auth/recipes/$recipeId/edit')({
  loader: ({ context: { queryClient }, params: { recipeId } }) => {
    return queryClient.ensureQueryData(recipeQueryOptions(recipeId))
  },
  errorComponent: RecipeErrorComponent,
  component: RecipeComponent,
})

export function RecipeErrorComponent({ error, reset }: ErrorComponentProps) {
  const router = useRouter()

  const queryErrorResetBoundary = useQueryErrorResetBoundary()

  useEffect(() => {
    queryErrorResetBoundary.reset()
  }, [queryErrorResetBoundary])

  if (error instanceof RecipeNotFoundError) {
    return <div>{error.message}</div>
  }

  return (
    <div>
      <button
        onClick={() => {
          router.invalidate()
        }}
      >
        retry
      </button>
      <ErrorComponent error={error} />
    </div>
  )
}


function RecipeComponent() {
  const recipeId = Route.useParams().recipeId
  const { data: recipe } = useSuspenseQuery(recipeQueryOptions(recipeId))

  const queryClient = useQueryClient();
  const navigate = Route.useNavigate()

  const { mutate } = useMutation({
    mutationFn: async (value) => {
      const res = await pb.collection('recipes').update(recipeId, value);
      console.log(res);
      return res;
    },
    onSuccess: (data: RecipeType) => {
      queryClient.invalidateQueries({ queryKey: ['recipes', data.id] });
      navigate({ to: `/recipes/${data.id}` })
    }
  })

  return (
    <div className="">
      <RecipeForm defaultValues={recipe} onSubmit={({ value }) => mutate(value)} />
      <div className='flex mt-5'>
        <Link to=".." as="a" className="px-3 py-2 bg-yellow-400">
          Back
        </Link>
      </div>
    </div>
  )
}
