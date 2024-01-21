import React, { useState } from 'react';
import { student, columns } from "./column"
import { DataTable } from "./data-table"

async function getData(): Promise<student[]> {
  return [
    {
      studentId: "241001",
      name: "حسن عبدالحميد العبدالعال",
      dateOfBirth: "12/03/2009",
      age: "15",
      fatherPhone: "0559763547",
      studentPhone: "-",
      email: "Hsoonxx@gmail.com",
      year: "الأول ثانوي",
      status: "انتظار",
      class: "الحلقة الأولى"
    },
    {    studentId: "-",
    name: "عبدالله علي المطاوعه",
    dateOfBirth: "23/10/2007",
    age: "17",
    fatherPhone: "0559763547",
    studentPhone: "055948567",
    email: "-",
    year: "الثالث ثانوي",
    status: "مقبول",
    class: "الحلقة الثانية"
  },
  {    studentId: "-",
  name: "عبدالله  المطاوعه",
  dateOfBirth: "23/10/2007",
  age: "17",
  fatherPhone: "0559763547",
  studentPhone: "055948567",
  email: "-",
  year: "الثالث ثانوي",
  status: "مقبول",
  class: "الحلقة الثانية"
},
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
