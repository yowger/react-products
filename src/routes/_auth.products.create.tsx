import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/products/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(products)/products/create"!</div>
}
