import { useQueryErrorResetBoundary, useSuspenseQuery } from '@tanstack/react-query'
import { ErrorComponent, ErrorComponentProps, Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { RecipeNotFoundError } from '../recipes'
import { useEffect } from 'react'
import parse from 'html-react-parser';
import { recipeQueryOptions } from '../queryOptions';
import IngredientsList from '../components/Ingredients';


export const Route = createFileRoute('/_auth/recipes/$recipeId/')({
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

  return (
    <div className="">
      <h2 className="text-4xl uppercase font-bold mb-2">{recipe.title}</h2>
      <img src={recipe.cover} className='rounded max-w-2xl aspect-square object-cover object-center' />
      <div className="bg-gray-200 p-3 my-5 rounded">
        <h3 className='text-2xl text-bold'>Ingredients</h3>
        <IngredientsList recipeId={recipeId} />
      </div>

      <h3 className='text-2xl text-bold mb-2'>Instructions</h3>
      <div className="text-lg">{recipe.instructions ? parse(recipe.instructions) : 'No instructions found'}</div>

      <div className='my-5 flex gap-4'>
        <Link to=".." as="a" className="px-3 py-2 bg-yellow-400">
          Back
        </Link>
        <Link to="edit" as='a' className='px-3 py-2 bg-teal-400 rounded block'>
          Edit
        </Link>
      </div>
    </div>
  )
}
