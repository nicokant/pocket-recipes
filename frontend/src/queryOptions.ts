import { queryOptions } from '@tanstack/react-query'
import { fetchRecipe, fetchRecipes, fetchIngredients } from './recipes'

export const recipeQueryOptions = (recipeId: string) =>
  queryOptions({
    queryKey: ['recipes', { recipeId }],
    queryFn: () => fetchRecipe(recipeId),
  })


export const recipesQueryOptions = queryOptions({
    queryKey: ['recipes'],
    queryFn: () => fetchRecipes(),
  })


export const ingredientsQueryOptions = (recipeId: string) =>
  queryOptions({
    queryKey: ['recipes', { recipeId }, 'ingredients'],
    queryFn: () => fetchIngredients(recipeId),
  })