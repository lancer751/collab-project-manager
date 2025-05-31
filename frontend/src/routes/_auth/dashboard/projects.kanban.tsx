import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dashboard/projects/kanban')({
  component: RouteComponent,
  loader: () => ({crumb: "tablero"})
})

function RouteComponent() {
  return <div>Hello "/_auth/dashboard/projects/kanban"!</div>
}
