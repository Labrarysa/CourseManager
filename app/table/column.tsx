"use client";

// Import necessary components and libraries
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Type definition for 'student', specifying the structure of student data
export type student = {
  studentId: string;
  name: string;
  dateOfBirth: string;
  age: string;
  fatherPhone: string;
  studentPhone: string;
  email: string;
  year: string;
  status: "انتظار" | "مقبول";
  class: string;
  group: string;
};

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
          <ArrowUpDown className="w-4 h-4 mr-1" />
        </Button>
      );
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
          <ArrowUpDown className="w-4 h-4 mr-1" />
        </Button>
      );
    },
  },
  // Dropdown column for selecting student's class
  {
    accessorKey: "class",
    header: ({ column }) => (
      <div className="flex items-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="mr-2"
        >
          الحَلقة
          <ArrowUpDown className="w-4 h-4 mr-1" />
        </Button>
      </div>
    ),
    cell: ({ cell }) => (
      <Select>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="اختيار الحَلقة" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="الحلقة الأولى">الحلقة الأولى</SelectItem>
          <SelectItem value="الحلقة الثانية">الحلقة الثانية</SelectItem>
          <SelectItem value="الحلقة الثالثة">الحلقة الثالثة</SelectItem>
          {/* Add more options here as needed */}
        </SelectContent>
      </Select>
    ),
  },
  // Dropdown column for selecting student's group
  {
    accessorKey: "group",
    header: ({ column }) => (
      <div className="flex items-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="mr-2"
        >
          المجموعة
          <ArrowUpDown className="w-4 h-4 mr-1" />
        </Button>
      </div>
    ),
    cell: ({ cell }) => (
      <Select>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="اختيار المجموعة" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="المجموعة الأولى">المجموعة الأولى</SelectItem>
          <SelectItem value="المجموعة الثانية">المجموعة الثانية</SelectItem>
          <SelectItem value="المجموعة الثالثة">المجموعة الثالثة</SelectItem>
          {/* Add more options here as needed */}
        </SelectContent>
      </Select>
    ),
  },
];
