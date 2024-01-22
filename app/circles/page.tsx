import React from "react";

import { Separator } from "@/components/ui/separator";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const circles = [
  { id: 1, name: "A" },
  { id: 2, name: "B" },
  { id: 3, name: "C" },
  { id: 4, name: "D" },
  { id: 5, name: "E" },
  { id: 6, name: "F" },
  { id: 7, name: "G" },
  { id: 8, name: "H" },
  { id: 9, name: "I" },
  { id: 10, name: "J" },
  { id: 11, name: "K" },
  { id: 12, name: "L" },
];

const Circles = () => {
  return (
    <main>
      <h1>الحلقات</h1>
      <Separator />
      <ul
        role="list"
        className="grid grid-cols-1 gap-8 mx-8 sm:gap-12 sm:mx-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {circles.map((circle) => (
          <li
            key={circle.id}
            className="flex flex-col col-span-1 text-center transition duration-500 transform bg-white divide-y divide-gray-200 rounded-lg shadow cursor-pointer hover:scale-105 hover:shadow-lg"
          >
            {circle.name}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Circles;
