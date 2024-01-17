// Importing table components from your UI component library
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  
  // Static data for students - this would typically come from a database
  const students = [
    {
      number: 1,
      name: "حسن عبدالحميد العبدالعال",
      studentId: "12647593073",
      year: "الأول الابتدائي",
      email: "Hsoonxx@gmail.com",
      phone: "0559763547"
    },
    {
      number: 2,
      name: "عبدالله علي المطاوعه",
      studentId: "758303736480",
      year: "الثالث ثانوي",
      email: "aboood@gmail.com",
      phone: "0559307583"
    },
  ];
  
  export default function Home() {
    // Calculate the number of students for display in the table caption
    const studentCount = students.length;
  
    return (
      // Positioning the table in the center of the page
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        {/* Scrollable container for the table on smaller screens */}
        <div className="table-auto md:w-full w-[300px]">
        {/* Table for displaying student data */}
        <Table className="min-w-full text-center">
          {/* Table caption showing the total number of students */}
          <TableCaption className="text-xl font-semibold py-2">
            {`عدد الطلاب: ${studentCount}`}
          </TableCaption>
  
          {/* Table header with column titles */}
          <TableHeader className="text-sm text-center">
            {/* Row for the main title spanning all columns */}
            <TableRow className="text-xl font-semibold py-2">
              <TableHead colSpan={6} className="text-center">كشف أسماء الطلاب</TableHead>
            </TableRow>
  
            {/* Row for column headings */}
            <TableRow>
              <TableHead className="text-center">الرقم</TableHead>
              <TableHead className="text-center">اسم الطالب الثلاثي</TableHead>
              <TableHead className="text-center">السجل المدني</TableHead>
              <TableHead className="text-center">المرحلة الدراسية</TableHead>
              <TableHead className="text-center">البريد الالكتروني</TableHead>
              <TableHead className="text-center">رقم الجوال</TableHead>
            </TableRow>
          </TableHeader>
  
          {/* Table body with data rows */}
          <TableBody className="divide-y">
            {students.map((student) => (
              // Row for each student's data
              <TableRow className="text-sm text-center" key={student.number}>
                <TableCell className="py-2 px-4">{student.number}</TableCell>
                <TableCell className="py-2 px-4">{student.name}</TableCell>
                <TableCell className="py-2 px-4">{student.studentId}</TableCell>
                <TableCell className="py-2 px-4">{student.year}</TableCell>
                <TableCell className="py-2 px-4">{student.email}</TableCell>
                <TableCell className="py-2 px-4">{student.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      </div>
    );
  }
  