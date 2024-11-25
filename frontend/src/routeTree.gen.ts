/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as AuthImport } from './routes/_auth'
import { Route as IndexImport } from './routes/index'
import { Route as AuthRecipesIndexImport } from './routes/_auth.recipes.index'
import { Route as AuthRecipesAddImport } from './routes/_auth.recipes.add'
import { Route as AuthRecipesRecipeIdIndexImport } from './routes/_auth.recipes.$recipeId.index'
import { Route as AuthRecipesRecipeIdIngredientsImport } from './routes/_auth.recipes.$recipeId.ingredients'
import { Route as AuthRecipesRecipeIdEditImport } from './routes/_auth.recipes.$recipeId.edit'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthRecipesIndexRoute = AuthRecipesIndexImport.update({
  path: '/recipes/',
  getParentRoute: () => AuthRoute,
} as any)

const AuthRecipesAddRoute = AuthRecipesAddImport.update({
  path: '/recipes/add',
  getParentRoute: () => AuthRoute,
} as any)

const AuthRecipesRecipeIdIndexRoute = AuthRecipesRecipeIdIndexImport.update({
  path: '/recipes/$recipeId/',
  getParentRoute: () => AuthRoute,
} as any)

const AuthRecipesRecipeIdIngredientsRoute =
  AuthRecipesRecipeIdIngredientsImport.update({
    path: '/recipes/$recipeId/ingredients',
    getParentRoute: () => AuthRoute,
  } as any)

const AuthRecipesRecipeIdEditRoute = AuthRecipesRecipeIdEditImport.update({
  path: '/recipes/$recipeId/edit',
  getParentRoute: () => AuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_auth/recipes/add': {
      id: '/_auth/recipes/add'
      path: '/recipes/add'
      fullPath: '/recipes/add'
      preLoaderRoute: typeof AuthRecipesAddImport
      parentRoute: typeof AuthImport
    }
    '/_auth/recipes/': {
      id: '/_auth/recipes/'
      path: '/recipes'
      fullPath: '/recipes'
      preLoaderRoute: typeof AuthRecipesIndexImport
      parentRoute: typeof AuthImport
    }
    '/_auth/recipes/$recipeId/edit': {
      id: '/_auth/recipes/$recipeId/edit'
      path: '/recipes/$recipeId/edit'
      fullPath: '/recipes/$recipeId/edit'
      preLoaderRoute: typeof AuthRecipesRecipeIdEditImport
      parentRoute: typeof AuthImport
    }
    '/_auth/recipes/$recipeId/ingredients': {
      id: '/_auth/recipes/$recipeId/ingredients'
      path: '/recipes/$recipeId/ingredients'
      fullPath: '/recipes/$recipeId/ingredients'
      preLoaderRoute: typeof AuthRecipesRecipeIdIngredientsImport
      parentRoute: typeof AuthImport
    }
    '/_auth/recipes/$recipeId/': {
      id: '/_auth/recipes/$recipeId/'
      path: '/recipes/$recipeId'
      fullPath: '/recipes/$recipeId'
      preLoaderRoute: typeof AuthRecipesRecipeIdIndexImport
      parentRoute: typeof AuthImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AuthRoute: AuthRoute.addChildren({
    AuthRecipesAddRoute,
    AuthRecipesIndexRoute,
    AuthRecipesRecipeIdEditRoute,
    AuthRecipesRecipeIdIngredientsRoute,
    AuthRecipesRecipeIdIndexRoute,
  }),
  LoginRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth",
        "/login"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/recipes/add",
        "/_auth/recipes/",
        "/_auth/recipes/$recipeId/edit",
        "/_auth/recipes/$recipeId/ingredients",
        "/_auth/recipes/$recipeId/"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_auth/recipes/add": {
      "filePath": "_auth.recipes.add.tsx",
      "parent": "/_auth"
    },
    "/_auth/recipes/": {
      "filePath": "_auth.recipes.index.tsx",
      "parent": "/_auth"
    },
    "/_auth/recipes/$recipeId/edit": {
      "filePath": "_auth.recipes.$recipeId.edit.tsx",
      "parent": "/_auth"
    },
    "/_auth/recipes/$recipeId/ingredients": {
      "filePath": "_auth.recipes.$recipeId.ingredients.tsx",
      "parent": "/_auth"
    },
    "/_auth/recipes/$recipeId/": {
      "filePath": "_auth.recipes.$recipeId.index.tsx",
      "parent": "/_auth"
    }
  }
}
ROUTE_MANIFEST_END */
