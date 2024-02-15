import React, { useEffect, useState } from 'react';
import { student, columns } from './column';
import { DataTable } from './data-table';

// Asynchronous function to fetch student data.
// In a real application, this might make an HTTP request to a server.
async function getData(): Promise<student[]> {
  // Example of fetched data - this would be replaced with real data fetching logic
  const fetchedData: student[] = [
    // ... replace with actual fetched data
  ];

  // If additional dynamic data is required, map over fetched data and add it
  const dataWithDynamicColumn = fetchedData.map(student => ({
    ...student,
    myDynamicData: 'This is dynamic data', // Replace with actual dynamic data logic
  }));

  // Return the data including any dynamic columns
  return dataWithDynamicColumn;
}

// DemoPage component that utilizes the DataTable component
export default function DemoPage() {
  // State to hold the student data
  const [data, setData] = useState<student[]>([]);

  // Effect hook to fetch data on component mount
  useEffect(() => {
    // Fetch data and set it in state
    getData().then(fetchedData => {
      setData(fetchedData);
    });
  }, []); // Empty dependency array means this effect runs once on mount

  // Render the container and the DataTable with the fetched data
  return (
    <div className='container px-2 py-10 mx-auto'>
      {/* Pass columns and data to the DataTable component */}
      <DataTable columns={columns} data={data} />
    </div>
  );
}
