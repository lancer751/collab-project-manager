import { ProjectsAssigned } from '@/components/charts/ProjectsAssigned'
import { RecentProjects } from '@/components/RecentProjects'
import { TableWithProjects } from '@/components/TableWithProjects'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dashboard/projects/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
    <RecentProjects className='col-span-1 md:col-span-2'/>
    <ProjectsAssigned className='col-span-1 md:col-span-2'/>
    <TableWithProjects className='col-span-1 sm:col-span-2 md:col-span-4'/>
    <RecentProjects className='col-span-1 md:col-span-2'/>
    <RecentProjects className='col-span-1 md:col-span-2'/>

  </div>
}
