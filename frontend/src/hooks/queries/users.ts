import { getAllUsers, getInfiniteUsers } from "@/services/users";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export function useUsers() {
    return useQuery({
        queryKey: ["users"],
        queryFn: getAllUsers,
    })
}

interface UserRequestFilters {
    name?: string,
    status?: string,
    rol?: string    
}

interface UserRequestSorters {
    gmail?: string,
    name?: string,
    entryDate?: string,
    type: string
}

export function useInfiniteUsers() {
    return useInfiniteQuery({
        queryKey: ["users"],
        queryFn: ({pageParam = 0}) => getInfiniteUsers({page: pageParam}),
        initialPageParam: 0,
        getNextPageParam: (lastPage, _allPages, lastPageParam) => {
            if(lastPage?.users.length === 0) {
                return undefined
            }
            return ++lastPageParam
        },
        getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
            if(firstPageParam < 0) {
                return undefined
            }
            return --firstPageParam
        },
        refetchOnWindowFocus: false
    })
}