import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dashboard/projects/all')({
  component: RouteComponent,
  loader: () => ({crumb: "todos"})
})

function RouteComponent() {
  return <div>Hello "/_auth/dashboard/projects/all"!</div>
}
