import { createFileRoute } from "@tanstack/react-router";
import { getInfiniteUsers } from "@/services/users";
import UsersTable from "@/components/users-table";

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
  },
});

function RouteComponent() {
  return (
    <div className="">
      <UsersTable/>
    </div>
  );
}
