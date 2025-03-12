import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/products/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/products/create"!</div>
}
