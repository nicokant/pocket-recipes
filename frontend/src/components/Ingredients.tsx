import { useQuery } from "@tanstack/react-query"
import { ingredientsQueryOptions } from "../queryOptions"
import { Link } from "@tanstack/react-router"

type IngredientsListProps = {
  recipeId: string
}

export default function IngredientsList({ recipeId }: IngredientsListProps) {
  const { data, isLoading } = useQuery(ingredientsQueryOptions(recipeId))

  if (isLoading || !data) {
    return null;
  }

  return (
    <>
      <ul className="px-5">
        {
          data.map(i => <li key={i.id} className="list-disc">
            {i.quantity ? (<span className="font-bold">{i.quantity}{i.unit}</span>) : null} {i.ingredient} {i.notes ? `(${i.notes})` : null}
          </li>)
        }
      </ul>

      <div className='flex mt-2'>
        <Link to="ingredients" as='a' className='ml-auto px-2 py-1 bg-teal-400 rounded block text-sm'>
          Edit
        </Link>
      </div>
    </>
  )
}