import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dashboard/inbox')({
  component: RouteComponent,
  loader: () => ({crumb: "bandeja de entrada"})
})

function RouteComponent() {
  return <div>Hello "/_auth/dashboard/inbox"!</div>
}
