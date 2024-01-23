// Importing necessary React hooks and components
import React, { useState } from 'react';
// Importing the student type and columns definition
import { student, columns } from "./column"
// Importing the DataTable component
import { DataTable } from "./data-table"

// Async function to fetch or simulate fetching of student data
async function getData(): Promise<student[]> {
  return [
    {
      // Hardcoded data representing student entries
      studentId: "241001",
      name: "حسن عبدالحميد العبدالعال",
      dateOfBirth: "12/03/2009",
      age: "15",
      fatherPhone: "0559763547",
      studentPhone: "-",
      email: "Hsoonxx@gmail.com",
      year: "الأول ثانوي",
      status: "انتظار",
      class: "الحلقة الأولى",
      group: "القروب الأول",
    },
    {
      studentId: "-",
      name: "عبدالله علي المطاوعه",
      dateOfBirth: "23/10/2007",
      age: "17",
      fatherPhone: "0559763547",
      studentPhone: "055948567",
      email: "-",
      year: "الثالث ثانوي",
      status: "مقبول",
      class: "الحلقة الثانية",
      group: "القروب الأول",
    },
  ]
}

// The DemoPage component
export default async function DemoPage() {
  // Fetching data asynchronously and storing it in a variable
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      {/* Rendering the DataTable component with the fetched data and column configuration */}
      <DataTable columns={columns} data={data} />
    </div>
  )
}
