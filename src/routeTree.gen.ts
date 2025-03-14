/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProfileImport } from './routes/profile'
import { Route as IndexImport } from './routes/index'
import { Route as ProductsIndexImport } from './routes/products/index'
import { Route as ProductsCreateImport } from './routes/products/create'
import { Route as ProductsProductIdIndexImport } from './routes/products/$productId/index'

// Create Virtual Routes

const ProductsProductIdEditLazyImport = createFileRoute(
  '/products/$productId/edit',
)()

// Create/Update Routes

const ProfileRoute = ProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ProductsIndexRoute = ProductsIndexImport.update({
  id: '/products/',
  path: '/products/',
  getParentRoute: () => rootRoute,
} as any)

const ProductsCreateRoute = ProductsCreateImport.update({
  id: '/products/create',
  path: '/products/create',
  getParentRoute: () => rootRoute,
} as any)

const ProductsProductIdIndexRoute = ProductsProductIdIndexImport.update({
  id: '/products/$productId/',
  path: '/products/$productId/',
  getParentRoute: () => rootRoute,
} as any)

const ProductsProductIdEditLazyRoute = ProductsProductIdEditLazyImport.update({
  id: '/products/$productId/edit',
  path: '/products/$productId/edit',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/products/$productId/edit.lazy').then((d) => d.Route),
)

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
    '/profile': {
      id: '/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileImport
      parentRoute: typeof rootRoute
    }
    '/products/create': {
      id: '/products/create'
      path: '/products/create'
      fullPath: '/products/create'
      preLoaderRoute: typeof ProductsCreateImport
      parentRoute: typeof rootRoute
    }
    '/products/': {
      id: '/products/'
      path: '/products'
      fullPath: '/products'
      preLoaderRoute: typeof ProductsIndexImport
      parentRoute: typeof rootRoute
    }
    '/products/$productId/edit': {
      id: '/products/$productId/edit'
      path: '/products/$productId/edit'
      fullPath: '/products/$productId/edit'
      preLoaderRoute: typeof ProductsProductIdEditLazyImport
      parentRoute: typeof rootRoute
    }
    '/products/$productId/': {
      id: '/products/$productId/'
      path: '/products/$productId'
      fullPath: '/products/$productId'
      preLoaderRoute: typeof ProductsProductIdIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/profile': typeof ProfileRoute
  '/products/create': typeof ProductsCreateRoute
  '/products': typeof ProductsIndexRoute
  '/products/$productId/edit': typeof ProductsProductIdEditLazyRoute
  '/products/$productId': typeof ProductsProductIdIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/profile': typeof ProfileRoute
  '/products/create': typeof ProductsCreateRoute
  '/products': typeof ProductsIndexRoute
  '/products/$productId/edit': typeof ProductsProductIdEditLazyRoute
  '/products/$productId': typeof ProductsProductIdIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/profile': typeof ProfileRoute
  '/products/create': typeof ProductsCreateRoute
  '/products/': typeof ProductsIndexRoute
  '/products/$productId/edit': typeof ProductsProductIdEditLazyRoute
  '/products/$productId/': typeof ProductsProductIdIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/profile'
    | '/products/create'
    | '/products'
    | '/products/$productId/edit'
    | '/products/$productId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/profile'
    | '/products/create'
    | '/products'
    | '/products/$productId/edit'
    | '/products/$productId'
  id:
    | '__root__'
    | '/'
    | '/profile'
    | '/products/create'
    | '/products/'
    | '/products/$productId/edit'
    | '/products/$productId/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ProfileRoute: typeof ProfileRoute
  ProductsCreateRoute: typeof ProductsCreateRoute
  ProductsIndexRoute: typeof ProductsIndexRoute
  ProductsProductIdEditLazyRoute: typeof ProductsProductIdEditLazyRoute
  ProductsProductIdIndexRoute: typeof ProductsProductIdIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ProfileRoute: ProfileRoute,
  ProductsCreateRoute: ProductsCreateRoute,
  ProductsIndexRoute: ProductsIndexRoute,
  ProductsProductIdEditLazyRoute: ProductsProductIdEditLazyRoute,
  ProductsProductIdIndexRoute: ProductsProductIdIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/profile",
        "/products/create",
        "/products/",
        "/products/$productId/edit",
        "/products/$productId/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/profile": {
      "filePath": "profile.tsx"
    },
    "/products/create": {
      "filePath": "products/create.tsx"
    },
    "/products/": {
      "filePath": "products/index.tsx"
    },
    "/products/$productId/edit": {
      "filePath": "products/$productId/edit.lazy.tsx"
    },
    "/products/$productId/": {
      "filePath": "products/$productId/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
