import { createFileRoute } from "@tanstack/react-router";
import { getInfiniteUsers } from "@/services/users";
import UsersTable from "@/components/users-table";
import { getAllRoles } from "@/services/roles";

export const Route = createFileRoute("/_auth/dashboard/users")({
  component: RouteComponent,
  loader: async ({ context: { queryClient } }) => {
    queryClient.prefetchInfiniteQuery({
      queryKey: ["users"],
      queryFn: ({ pageParam = 1 }) => getInfiniteUsers({ page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (lastPage?.users.length === 0) {
          return undefined;
        }
        return ++lastPageParam;
      },
      pages: 1,
    });
    queryClient.prefetchQuery({
      queryKey: ["rols"],
      queryFn: getAllRoles,
    })

    return ({crumb: "usuarios"})
  },
});

function RouteComponent() {
  return (
    <div className="p-4 h-full">
      <UsersTable/>
    </div>
  );
}
