import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$id/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/posts/$id/edit"!</div>
}
