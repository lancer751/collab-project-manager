import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dashboard/projects/actives')({
  component: RouteComponent,
  loader: () => ({crumb: "activos"})
})

function RouteComponent() {
  return <div>Hello "/_auth/dashboard/projects/actives"!</div>
}
