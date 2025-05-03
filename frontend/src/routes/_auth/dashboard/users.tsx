import { createFileRoute } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown, Search, Check } from 'lucide-react'

const USERS = [
  { id: 1, name: 'Laura Pacheco', role: 'admin', email: 'pachecolau27@gmail.com', status: 'activo' },
  { id: 2, name: 'Juan Pérez', role: 'miembro', email: 'juanperez@mail.com', status: 'inactivo' },
  { id: 3, name: 'Ana Gómez', role: 'invitado', email: 'anagomez@mail.com', status: 'activo' },
  { id: 4, name: 'Carlos Ruiz', role: 'miembro', email: 'carlosruiz@mail.com', status: 'activo' },
]

const ROLES = [
  { label: 'Todos', value: '' },
  { label: 'Admin', value: 'admin' },
  { label: 'Miembro', value: 'miembro' },
  { label: 'Invitado', value: 'invitado' },
]
const STATUS = [
  { label: 'Todos', value: '' },
  { label: 'Activo', value: 'activo' },
  { label: 'Inactivo', value: 'inactivo' },
]
const ORDER = [
  { label: 'A-Z', value: 'az' },
  { label: 'Z-A', value: 'za' },
  { label: 'Email', value: 'email' },
]

export const Route = createFileRoute('/_auth/dashboard/users')({
  component: RouteComponent,
})

function RouteComponent() {
  const [search, setSearch] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('')
  const [order, setOrder] = useState('az')
  const [selected, setSelected] = useState<number[]>([])

  const filtered = useMemo(() => {
    let data = USERS.filter(u =>
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.role.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.status.toLowerCase().includes(search.toLowerCase())) &&
      (role ? u.role === role : true) &&
      (status ? u.status === status : true)
    )
    if (order === 'az') data = data.sort((a, b) => a.name.localeCompare(b.name))
    if (order === 'za') data = data.sort((a, b) => b.name.localeCompare(a.name))
    if (order === 'email') data = data.sort((a, b) => a.email.localeCompare(b.email))
    return data
  }, [search, role, status, order])

  const allSelected = filtered.length > 0 && filtered.every(u => selected.includes(u.id))
  const toggleAll = () => {
    if (allSelected) setSelected(selected.filter(id => !filtered.some(u => u.id === id)))
    else setSelected([...selected, ...filtered.filter(u => !selected.includes(u.id)).map(u => u.id)])
  }
  const toggleOne = (id: number) => {
    setSelected(selected => selected.includes(id) ? selected.filter(i => i !== id) : [...selected, id])
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative w-full max-w-xs">
          <Input
            placeholder="Buscar"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        </div>
        <div className="flex gap-2 items-center justify-end w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                Estado <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {STATUS.map(opt => (
                <DropdownMenuItem key={opt.value} onClick={() => setStatus(opt.value)}>
                  {status === opt.value && <Check className="size-4 mr-2" />} {opt.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                Rol <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {ROLES.map(opt => (
                <DropdownMenuItem key={opt.value} onClick={() => setRole(opt.value)}>
                  {role === opt.value && <Check className="size-4 mr-2" />} {opt.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                Ordenar <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {ORDER.map(opt => (
                <DropdownMenuItem key={opt.value} onClick={() => setOrder(opt.value)}>
                  {order === opt.value && <Check className="size-4 mr-2" />} {opt.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border bg-background">
        <table className="min-w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-2 w-8 text-center">
                <Checkbox checked={allSelected} onCheckedChange={toggleAll} aria-label="Seleccionar todos" />
              </th>
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-left">Rol</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} className="border-t hover:bg-accent/30 transition-colors">
                <td className="p-2 text-center">
                  <Checkbox checked={selected.includes(u.id)} onCheckedChange={() => toggleOne(u.id)} aria-label={`Seleccionar ${u.name}`} />
                </td>
                <td className="p-2">{u.name}</td>
                <td className="p-2 capitalize">{u.role}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2 capitalize">
                  <span className={u.status === 'activo' ? 'text-green-600' : 'text-gray-400'}>
                    {u.status}
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-muted-foreground">No se encontraron usuarios.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
