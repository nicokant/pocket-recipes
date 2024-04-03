import { useMutation, useQueryClient, useQueryErrorResetBoundary, useSuspenseQuery } from '@tanstack/react-query'
import { ErrorComponent, ErrorComponentProps, Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { RecipeNotFoundError, RecipeType } from '../recipes'
import { useEffect } from 'react'
import { ingredientsQueryOptions } from '../queryOptions';
import { pb } from '../pb';
import IngredientForm from '../components/IngredientForm';
import toast from 'react-hot-toast';


export const Route = createFileRoute('/_auth/recipes/$recipeId/ingredients')({
  loader: ({ context: { queryClient }, params: { recipeId } }) => {
    return queryClient.ensureQueryData(ingredientsQueryOptions(recipeId))
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
  const { data: ingredients } = useSuspenseQuery(ingredientsQueryOptions(recipeId))

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async ({ id, value, remove }) => {
      console.log(value);
      let res = null;
      if (!id) {
        res = await pb.collection('ingredients').create({ ...value, recipe: recipeId });
      } else {
        if (remove) {
          res = await pb.collection('ingredients').delete(id);
        } else {
          res = await pb.collection('ingredients').update(id, { ...value, recipe: recipeId });
        }
      }
      return res;
    },
    onSuccess: (data: RecipeType, variables) => {
      toast.success('Saved')
      queryClient.invalidateQueries({ queryKey: ['recipes', { recipeId }, 'ingredients'] });
    },
    onError: () => {
      toast.error('Not saved')
    }
  })

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-2">Update Ingredients</h2>
      {
        ingredients.map(i => (
          <div key={i.id} className='flex items-start gap-2'>
            <IngredientForm defaultValues={i} onSubmit={({ value }) => mutate({ id: i.id, value })} submit='Save' />
            <button className='px-3 py-2 bg-red-400 rounded self-center' onClick={() => mutate({ id: i.id, remove: true })}>Remove</button>
          </div>
        ))
      }
      <h4 className='text-2xl font-bold mt-5'>Add new ingredient</h4>
      <IngredientForm onSubmit={({ value }) => mutate({ id: null, value })} submit='Create' />

      <div className='flex'>
        <Link to=".." as="a" className="px-3 py-2 bg-yellow-400">
          Back
        </Link>
      </div>
    </div>
  )
}
