"use client"

import { ColumnDef } from "@tanstack/react-table"

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
}

export const columns: ColumnDef<student>[] = [
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
    header: "العمر",
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
    header: "الحالة",
  },
]
