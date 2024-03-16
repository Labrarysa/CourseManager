"use client";

import * as React from 'react';
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  ColumnFiltersState,
  VisibilityState
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Define the props for the DataTable component, specifying columns and data types
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// The DataTable component which will render a table using the given columns and data
export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  // State hooks to manage sorting, filtering, visibility, and selection states
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Initialize the table with configuration for sorting, filtering, and visibility
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // The rendered UI of the DataTable
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex items-center justify-between w-full mb-16">
        {/* Section for row selection and search input */}
        <div className="flex items-end text-sm text-muted-foreground">
          {/* Text showing count of selected and filtered rows */}
          تم اختيار
          <br />
          {table.getFilteredSelectedRowModel().rows.length} من{" "}
          {table.getFilteredRowModel().rows.length}
        </div>

        {/* Search input field for filtering rows by name */}
        <div className="flex items-center justify-center">
          <Input
            placeholder="ابحث بالاسم ..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="w-40 md:w-64"
          />
        </div>

        {/* Dropdown menu for controlling the visibility of columns */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                تصنيف
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* Checkbox items for each column to toggle visibility */}
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* The main table component rendering the header and body */}
      <Table>
        {/* Table header rendering each column header */}
        <TableHeader>
          <TableRow className="py-2 text-xl font-semibold ">
            <TableHead
              colSpan={12}
              className="text-2xl font-bold tracking-tight text-center text-black py-7 scroll-m-20 lg:text-3xl"
            >
              كشف أسماء المتقدمين
            </TableHead>
          </TableRow>
          {/* Render each header group and header within it */}
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-center">
                  {/* Use flexRender to render the header or a placeholder */}
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        {/* Table body rendering, iterating over each row and cell */}
        <TableBody className="text-center">
          {/* Check if there are rows to display */}
          {table.getRowModel().rows.length ? (
            // Map each row to a TableRow
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                // Apply a selected state if the row is selected
                data-state={row.getIsSelected() ? "selected" : undefined}
              >
                {/* Map each cell in the row to a TableCell */}
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {/* Use flexRender to render the content of the cell */}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            // Display a message when there are no results
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                لا توجد نتائج.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Action buttons for the table */}
      <div className="flex justify-center mt-16">
        {/* Button for submitting changes or selections */}
        <div>
          <Button>ارسال</Button>
        </div>

        {/* Button for deleting selected items or performing other actions */}
        <div className="mr-10">
          <Button className="text-white duration-300 bg-red-600 hover:bg-red-500 transition-all">
            حذف
          </Button>
        </div>
      </div>
    </div>
  );
}
