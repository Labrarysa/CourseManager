import React from 'react';
import { student, columns } from './column';
import { DataTable } from './data-table';

// The main page component that renders the DataTable.
// It receives 'data' as a prop from getServerSideProps.
export default function DemoPage({ data }) {
  // This component renders a container div with padding and margin styling
  // and includes the DataTable component, passing in the columns and data props.
  return (
    <div className='container px-2 py-10 mx-auto'>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

// getServerSideProps is a Next.js function that runs on the server for each request.
// It fetches data that is passed as props to the page component above.
export async function getServerSideProps() {
  // Simulate data fetching. In a real application, this could be an API call.
  const data: student[] = [
    // ... replace this with actual data fetching logic
  ];

  // The fetched data is returned as props to the page component.
  // This data will be server-rendered, so it's available before the page is sent to the client.
  return { props: { data } };
}
