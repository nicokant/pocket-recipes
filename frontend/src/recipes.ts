import { pb } from './pb';

export type RecipeType = {
  id?: string | null
  title: string
  instructions: string
}

export class RecipeNotFoundError extends Error {}

export const fetchRecipe = async (id: string) => {
  return await pb.collection('recipes').getOne(id);
}

export const fetchRecipes = async () => {
  return await pb.collection('recipes').getFullList({
    batch: 50,
  })
}

export const fetchIngredients = async (id: string) => {
  return (await pb.collection('ingredients').getList(1, 100, {
    filter: `recipe = '${id}'`,
  })).items
}
