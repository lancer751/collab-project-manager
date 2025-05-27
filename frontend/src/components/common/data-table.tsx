import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";

interface DataTableProps<TData extends { id: number }, TValue, T> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  queryUtilities: {
    fetchNextPage: (
      options?: FetchNextPageOptions
    ) => Promise<
      InfiniteQueryObserverResult<InfiniteData<T | undefined, unknown>, Error>
    >;
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    isError: boolean;
    error: Error | null;
  };
  rowSelection: RowSelectionState,
  setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>
}

export function DataTable<TData extends { id: number }, TValue, T>({
  columns,
  data,
  queryUtilities,
  rowSelection,
  setRowSelection
}: DataTableProps<TData, TValue, T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { fetchNextPage, isFetchingNextPage, hasNextPage, isError, error } =
    queryUtilities;
    const table = useReactTable({
      getRowId: (row) => String(row.id),
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });
  const sentinelRef = useRef<null | HTMLTableRowElement>(null);
  const observerRef = useRef<IntersectionObserver>(null);

  const onIntersecting = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const sentineElement = sentinelRef.current;
    observerRef.current = new IntersectionObserver(onIntersecting, {
      root: null,
      rootMargin: "50px",
      threshold: 0.2,
    });

    if (sentineElement) {
      observerRef.current.observe(sentineElement);
    }

    return () => {
      if (observerRef.current && sentineElement) {
        observerRef.current.unobserve(sentineElement);
      }
    };
  }, [onIntersecting]);

  return (
    <>
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                <TableRow ref={sentinelRef}>
                  <TableCell
                    colSpan={columns.length}
                    className="hidden text-center"
                  ></TableCell>
                </TableRow>
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={columns.length}
                    className={`${!isFetchingNextPage && !hasNextPage && "hidden"} text-center h-10 pt-5`}
                  >
                    <div className="mx-auto flex justify-center">
                      <LoaderCircle className="animate-spin" />
                    </div>
                  </TableCell>
                </TableRow>
                {!hasNextPage && !isFetchingNextPage && (
                  <TableRow className="hover:bg-transparent">
                    <TableCell
                      colSpan={columns.length}
                      className="text-neutral-50 text-center h-10 pt-5"
                    >
                      No hay más resultados disponibles
                    </TableCell>
                  </TableRow>
                )}
              </>
            ) : (
              <>
                {isError && error ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      {error.message}
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No Results
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
