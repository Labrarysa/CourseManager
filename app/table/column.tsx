"use client"

// Import necessary components and libraries
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

// Type definition for 'student', specifying the structure of student data
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

// Definition of table columns for displaying student data
export const columns: ColumnDef<student>[] = [
  
  // Checkbox column for selecting rows
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

  // Column for student ID
  {
    accessorKey: "studentId",
    header: "الرقم الأكاديمي",
  },
  // Column for student name
  {
    accessorKey: "name",
    header: "الاسم الثلاثي",
  },
  // Column for student's date of birth
  {
    accessorKey: "dateOfBirth",
    header: "تاريخ الميلاد",
  },
  // Column for student's age with sorting functionality
  {
    accessorKey: "age",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
           العمر
          <ArrowUpDown className="mr-1 h-4 w-4" />
        </Button>
      )
    },
  },
  // Column for father's phone number
  {
    accessorKey: "fatherPhone",
    header: "رقم جوال ولي الأمر",
  },
  // Column for student's phone number
  {
    accessorKey: "studentPhone",
    header: "رقم جوال الطالب",
  },
  // Column for student's email address
  {
    accessorKey: "email",
    header: "البريد الالكتروني",
  },
  // Column for student's academic year
  {
    accessorKey: "year",
    header: "المرحلة الدراسية",
  },
  // Column for student's status with sorting functionality
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
           الحالة
          <ArrowUpDown className="mr-1 h-4 w-4" />
        </Button>
      )
    },
  },
  // Dropdown column for selecting student's class
  {
    accessorKey: "class",
    header: "الحَلقة ",
    cell: ({ cell }) => (
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="اختيار الحَلقة" value={cell.getValue()} />
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
