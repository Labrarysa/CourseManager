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
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const circles = [
  { id: 1, name: "الحلقة الأولى", groups: [{ id: 1, groupName: "a" }] },
  { id: 2, name: "الحلقة الثانية", groups: [{ id: 1, groupName: "a" }] },
  { id: 3, name: "الحلقة الثالثة", groups: [{ id: 1, groupName: "a" }] },
  { id: 4, name: "الحلقة الرابعة", groups: [{ id: 1, groupName: "a" }] },
  { id: 5, name: "الحلقة الخامسة", groups: [{ id: 1, groupName: "a" }] },
  { id: 6, name: "الحلقة السادسة", groups: [{ id: 1, groupName: "a" }] },
  { id: 7, name: "الحلقة السابعة", groups: [{ id: 1, groupName: "a" }] },
  { id: 8, name: "الحلقة الثامنة", groups: [{ id: 1, groupName: "a" }] },
  { id: 9, name: "الحلقة التاسعة", groups: [{ id: 1, groupName: "a" }] },
  { id: 10, name: "الحلقة العاشرة", groups: [{ id: 1, groupName: "a" }] },
  { id: 11, name: "الحلقة الحادية عشر", groups: [{ id: 1, groupName: "a" }] },
  { id: 12, name: "الحلقة الثانية عشر", groups: [{ id: 1, groupName: "a" }] },
];

const Circles = () => {
  return (
    <main>
      <div className="m-8">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          الحلقات
        </h1>
      </div>
      <Separator />
      <div
        role="list"
        className="grid grid-cols-1 gap-8 m-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {circles.map((circle) => (
          <Drawer key={circle.id}>
            <DrawerTrigger asChild>
              <Card className="flex flex-col col-span-1 text-center transition duration-500 transform bg-white divide-y divide-gray-200 shadow cursor-pointer hover:scale-105 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="">{circle.name}</CardTitle>
                  <CardDescription>
                    عدد المجموعات: {circle.groups.length}
                  </CardDescription>
                </CardHeader>
              </Card>
            </DrawerTrigger>
            <DrawerContent>Hi</DrawerContent>
          </Drawer>
        ))}
      </div>
    </main>
  );
};

export default Circles;
