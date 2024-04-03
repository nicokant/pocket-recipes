import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { recipesQueryOptions } from '../queryOptions'

export const Route = createFileRoute('/_auth/recipes/')({
  component: RecipesComponent,
  loader: ({ context: { queryClient } }) =>
  queryClient.ensureQueryData(recipesQueryOptions),
})


function RecipesComponent() {
  const recipesQuery = useSuspenseQuery(recipesQueryOptions)
  const recipes = recipesQuery.data

  return (
    <div className="p-2 grid grid-cols-4 gap-2">
        {recipes.map(
          (recipe) => {
            return (
              <div key={recipe.id} className="border rounded">
                <Link
                  to="/recipes/$recipeId"
                  params={{
                    recipeId: recipe.id,
                  }}
                  className="block hover:opacity-75"
                  activeProps={{ className: 'font-bold underline' }}
                >
                  <img src={recipe.cover || 'https://picsum.photos/800/800?cache=' + recipe.id} className='mx-w-full aspect-square object-cover object-center'/>
                  <div className='text-lg font-bold p-2'>{recipe.title}</div>
                </Link>
              </div>
            )
          },
        )}
    </div>
  )
}
