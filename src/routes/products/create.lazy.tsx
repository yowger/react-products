import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/products/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/products/create"!</div>
}
