import { useInfiniteUsers } from "@/hooks/queries/users";
import { useMemo, useState } from "react";
import UsersFilters from "./users-filters";
import { DataTable } from "./common/data-table";
import { UsersColumns } from "./users/users-columns";
import { UserRequestFilters, UserRequestSort } from "@/types/user.types";
import { ModalFormUser } from "./common/ModalFormUser";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import { EditFilters } from "./edit-filters";
import { RowSelectionState } from "@tanstack/react-table";

export default function UsersTable() {
  const [modalMode, setModalMode] = useState<"edit" | "create">("create");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [filters, setFilters] = useState<UserRequestFilters>({
    name: "",
    rol: "",
    status: "",
  });
  const [sorters, setSorters] = useState<UserRequestSort>({});
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
    isError,
  } = useInfiniteUsers({ filters, sorters });
  const queryUtilities = {
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    error,
  };

  const users = useMemo(() => {
    return data ? data.pages.flatMap((page) => page?.users ?? []) : [];
  }, [data]);

  const cleanSelectedRows = () => setRowSelection({});

  const handleUserEdit = (userId: number) => {
    setModalOpen(true);
    setSelectedUserId(userId);
    setModalMode("edit");
  };

  const handleCreateNewUser = () => {
    setModalOpen(true);
    setSelectedUserId(null);
    setModalMode("create");
  };

  return (
    <section>
      <div className="mb-6 flex flex-col md:flex-row items-center md:justify-between md:items-end gap-5">
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-4xl font-bold">Usuarios</h1>
          <p className="text-primary">
            Administra a todos los usuarios existentes en el sistema.
          </p>
        </div>
        <Button className="max-w-max" onClick={handleCreateNewUser}>
          <PlusCircle /> Nuevo Usuario
        </Button>
      </div>
      <div className="space-y-6">
        <UsersFilters
          filters={filters}
          sorters={sorters}
          setFilters={setFilters}
          setSorters={setSorters}
        />
        <DataTable
          columns={UsersColumns({ onEdit: handleUserEdit })}
          data={users}
          queryUtilities={queryUtilities}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
        />
        {Object.keys(rowSelection).length > 0 && (
          <EditFilters
            selectedRows={rowSelection}
            handleSelectedRows={cleanSelectedRows}
          />
        )}
      </div>
      <ModalFormUser
        isOpen={isModalOpen}
        mode={modalMode}
        onClose={() => setModalOpen(false)}
        userId={selectedUserId}
      />
    </section>
  );
}
