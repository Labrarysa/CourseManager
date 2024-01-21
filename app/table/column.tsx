"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type student = {
  studentId: string
  name: string
  dateOfBirth: string
  age: string
  fatherPhone: string
  studentPhone: string
  email: string
  year: string
  status: "انتظار" | "مقبول" 
  class: string
}

export const columns: ColumnDef<student>[] = [
  
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },

  {
    accessorKey: "studentId",
    header: "الرقم الأكاديمي",
  },
  {
    accessorKey: "name",
    header: "الاسم الثلاثي",
  },
  {
    accessorKey: "dateOfBirth",
    header: "تاريخ الميلاد",
  },
  {
    accessorKey: "age",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
           العمر
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "fatherPhone",
    header: "رقم جوال ولي الأمر",
  },
  {
    accessorKey: "studentPhone",
    header: "رقم جوال الطالب",
  },
  {
    accessorKey: "email",
    header: "البريد الالكتروني",
  },
  {
    accessorKey: "year",
    header: "المرحلة الدراسية",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
           الحالة
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "class",
    header: "الحَلقة ",
    cell: ({ cell }) => (
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select class" value={cell.getValue()} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="الحلقة الأولى">الحلقة الأولى</SelectItem>
          <SelectItem value="الحلقة الثانية">الحلقة الثانية</SelectItem>
          <SelectItem value="الحلقة الثالثة">الحلقة الثالثة</SelectItem>
          {/* Add more options here as needed */}
        </SelectContent>
      </Select>
    )
  },
]
