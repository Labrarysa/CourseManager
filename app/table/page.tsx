// "use client";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// // Initial static data for students
// const initialStudents = [
//   {
    // studentId: "241001",
    // name: "حسن عبدالحميد العبدالعال",
    // dateOfBirth: "12/03/2009",
    // age: "15",
    // fatherPhone: "0559763547",
    // studentPhone: "-",
    // email: "Hsoonxx@gmail.com",
    // year: "الأول ثانوي",
//   },
//   {
    // studentId: "-",
    // name: "عبدالله علي المطاوعه",
    // dateOfBirth: "23/10/2007",
    // age: "17",
    // fatherPhone: "0559763547",
    // studentPhone: "055948567",
    // email: "-",
    // year: "الثالث ثانوي",
//   },
// ];

// export default function Home() {
//   // useState hook to manage student data
//   const [students, setStudents] = useState(initialStudents);
//   // Calculate the number of students for display in the table caption
//   const studentCount = students.length;

//   return (
//     // Positioning the table in the center of the page
//     <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
//       {/* Scrollable container for the table on smaller screens */}
//       <div className="table-auto md:w-full w-[300px]">
//       {/* Table for displaying student data */}
//       <Table className="min-w-full text-center">
//         {/* Table caption showing the total number of students */}
//         <TableCaption className="text-xl font-semibold py-2">
//           {`عدد الطلاب: ${studentCount}`}
//         </TableCaption>

//         {/* Table header with column titles */}
//         <TableHeader className="text-sm text-center">
//           {/* Row for the main title spanning all columns */}
          // <TableRow className="text-xl font-semibold py-2">
          //   <TableHead colSpan={8} className="text-center">كشف أسماء الطلاب</TableHead>
          // </TableRow>

//           {/* Row for column headings */}
//           <TableRow>
//             <TableHead className="text-center">الرقم الأكاديمي</TableHead>
//             <TableHead className="text-center">الاسم الثلاثي</TableHead>
//             <TableHead className="text-center">تاريخ الميلاد</TableHead>
//             <TableHead className="text-center">العمر</TableHead>
//             <TableHead className="text-center">رقم جوال ولي الأمر</TableHead>
//             <TableHead className="text-center">رقم جوال الطالب</TableHead>
//             <TableHead className="text-center">البريد الالكتروني</TableHead>
//             <TableHead className="text-center">المرحلة الدراسية</TableHead>
            
//           </TableRow>
//         </TableHeader>

//         {/* Table body with data rows */}
//         <TableBody className="divide-y">
//           {students.map((student) => (
//             // Row for each student's data
//             <TableRow className="text-sm text-center" key={student.studentId}>
//               <TableCell className="py-2 px-4">{student.studentId}</TableCell>
//               <TableCell className="py-2 px-4">{student.name}</TableCell>
//               <TableCell className="py-2 px-4">{student.dateOfBirth}</TableCell>
//               <TableCell className="py-2 px-4">{student.age}</TableCell>
//               <TableCell className="py-2 px-4">{student.fatherPhone}</TableCell>
//               <TableCell className="py-2 px-4">{student.studentPhone}</TableCell>
//               <TableCell className="py-2 px-4">{student.email}</TableCell>
//               <TableCell className="py-2 px-4">{student.year}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { student, columns } from "./column"
import { DataTable } from "./data-table"

async function getData(): Promise<student[]> {
  // Fetch data from your API here.
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
      status: "مقبول",
    },
    {    studentId: "-",
    name: "عبدالله علي المطاوعه",
    dateOfBirth: "23/10/2007",
    age: "17",
    fatherPhone: "0559763547",
    studentPhone: "055948567",
    email: "-",
    year: "الثالث ثانوي",
    status: "انتظار",
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
