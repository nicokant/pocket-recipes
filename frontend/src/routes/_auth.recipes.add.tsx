import { useForm } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'
import TEditor from '../components/TrixEditor'
import { pb } from '../pb'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import RecipeForm from '../components/RecipeForm'

export const Route = createFileRoute('/_auth/recipes/add')({
  component: AddRecipeComponent,
})


function AddRecipeComponent() {
  const queryClient = useQueryClient();
  const navigate = Route.useNavigate()

  const { mutate } = useMutation({
    mutationFn: async (value) => {
      const res = await pb.collection('recipes').create(value);
      console.log(res);
      return res;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      navigate({ to: `/recipes/${data.id}/ingredients`})
    }
  })

  return (
    <div className="">
      <h2 className='text-2xl font-bold'>Add new Recipe</h2>
      <RecipeForm onSubmit={({ value }) => mutate(value)} />
    </div>
  )
}
