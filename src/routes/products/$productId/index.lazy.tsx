import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/products/$productId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/products/$productId/"!</div>
}
