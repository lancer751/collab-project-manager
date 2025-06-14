import TaskDataTable from '@/components/TaskDataTable'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dashboard/tasks/all')({
  component: RouteComponent,
  loader: () => ({crumb: "todos"})
})

function RouteComponent() {
  return <TaskDataTable/>
}
