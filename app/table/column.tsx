"use client";

// Import necessary UI components and utilities
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table"; // Import Column Definition type from react-table
import { ArrowUpDown } from "lucide-react"; // Icon for indicating sorting
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define the structure of the student data that will be used in the table
export type student = {
  // ... (other student properties)
  myDynamicData?: string; // Optional field for dynamic data that might be added
};

// Function to create a dynamic column for the table
// headerTitle: Display name of the column
// accessor: Key of the data to be accessed for this column
// sortable: Flag indicating if the column should be sortable
const createDynamicColumn = (headerTitle: string, accessor: string, sortable: boolean) => {
  // Initialize the column definition with basic properties
  const column: ColumnDef<student> = {
    accessorKey: accessor, // Data key this column should access
    header: sortable
      ? ({ column }) => (
          // If sortable, return a header component with a sorting button
          <div className="flex items-center">
            {headerTitle}
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} // Toggle sorting on click
              className="ml-2"
            >
              <ArrowUpDown className="w-4 h-4" /> // Sorting icon
            </Button>
          </div>
        )
      : headerTitle, // If not sortable, return just the title
  };

  // If the column should be sortable, enable sorting features
  if (sortable) {
    column.enableSorting = true;
  }

  return column; // Return the fully defined column object
};

// Create an instance of a dynamic column
const dynamicColumn = createDynamicColumn('Dynamic Column', 'myDynamicData', true);

// Export the array of column definitions, including any dynamic columns created
export const columns: ColumnDef<student>[] = [
  // ... (other columns definitions),
  dynamicColumn, // Include the dynamic column in the columns array
  // ... (you can add more dynamic columns or static columns as needed)
];
