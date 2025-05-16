import { useInfiniteUsers } from "@/hooks/queries/users";
import { useMemo, useState } from "react";
import UsersFilters from "./users-filters";
import { DataTable } from "./common/data-table";
import { UsersColumns } from "./users/users-columns";
import { UserRequestFilters, UserRequestSort } from "@/types/user.types";


export default function UsersTable() {
  const [filters, setFilters] = useState<UserRequestFilters>({
    name: "",
    rol: "",
    status: ""
  })
  const [sorters, setSorters] = useState<UserRequestSort>({})
  console.log(sorters)
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
    isError,
  } = useInfiniteUsers({filters, sorters});

    
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
  console.log(users)

  return (
    <div className="space-y-6">
      <UsersFilters filters={filters} sorters={sorters} setFilters={setFilters} setSorters={setSorters}/>
      <DataTable
        columns={UsersColumns}
        data={users}
        queryUtilities={queryUtilities}
      />
    </div>
  )
}
