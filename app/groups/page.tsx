import React from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { group } from "console";
import { Button } from "@/components/ui/button";

const circles = [
  {
    id: 1,
    name: "الحلقة الأولى",
    groups: [
      { id: 1, groupName: "المصطفى", teacher: "أحمد محسن", studentCount: 9 },
    ],
  },
  {
    id: 2,
    name: "الحلقة الثانية",
    groups: [
      { id: 1, groupName: "الأمير", teacher: "أحمد محسن", studentCount: 11 },
    ],
  },
  {
    id: 3,
    name: "الحلقة الثالثة",
    groups: [
      { id: 1, groupName: "المجتبى", teacher: "أحمد محسن", studentCount: 7 },
    ],
  },
  {
    id: 4,
    name: "الحلقة الرابعة",
    groups: [
      { id: 1, groupName: "الشهيد", teacher: "أحمد محسن", studentCount: 13 },
    ],
  },
  {
    id: 5,
    name: "الحلقة الخامسة",
    groups: [
      { id: 1, groupName: "السجاد", teacher: "أحمد محسن", studentCount: 6 },
    ],
  },
  {
    id: 6,
    name: "الحلقة السادسة",
    groups: [
      { id: 1, groupName: "الباقر", teacher: "أحمد محسن", studentCount: 9 },
    ],
  },
  {
    id: 7,
    name: "الحلقة السابعة",
    groups: [
      { id: 1, groupName: "الصادق", teacher: "أحمد محسن", studentCount: 10 },
    ],
  },
  {
    id: 8,
    name: "الحلقة الثامنة",
    groups: [
      { id: 1, groupName: "الكاظم", teacher: "أحمد محسن", studentCount: 15 },
    ],
  },
  {
    id: 9,
    name: "الحلقة التاسعة",
    groups: [
      { id: 1, groupName: "الرضا", teacher: "أحمد محسن", studentCount: 6 },
    ],
  },
  {
    id: 10,
    name: "الحلقة العاشرة",
    groups: [
      { id: 1, groupName: "الجواد", teacher: "أحمد محسن", studentCount: 9 },
    ],
  },
  {
    id: 11,
    name: "الحلقة الحادية عشر",
    groups: [
      { id: 1, groupName: "الهادي", teacher: "أحمد محسن", studentCount: 11 },
    ],
  },
  {
    id: 12,
    name: "الحلقة الثانية عشر",
    groups: [
      { id: 1, groupName: "العسكري", teacher: "أحمد محسن", studentCount: 12 },
    ],
  },
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
              <Card className="text-center transition duration-500 transform shadow cursor-pointer hover:scale-105 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="">{circle.name}</CardTitle>
                  <CardDescription>
                    عدد المجموعات: {circle.groups.length}
                  </CardDescription>
                </CardHeader>
              </Card>
            </DrawerTrigger>
            <DrawerContent>
              <div className="flex flex-col items-center justify-center m-8">
                <div>
                  <DrawerHeader>
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                      مجموعات {circle.name}
                    </h3>
                  </DrawerHeader>
                </div>
                <div className="flex justify-center">
                  <div
                    role="list"
                    className="grid grid-cols-1 gap-8 m-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  >
                    {circle.groups.map((group) => (
                      <Card
                        key={group.id}
                        className="text-center transition duration-500 transform shadow cursor-pointer hover:scale-105 hover:shadow-md"
                      >
                        <CardHeader>
                          <CardTitle>{group.groupName}</CardTitle>
                          <CardDescription>
                            المحاضر: {group.teacher}
                          </CardDescription>
                          <CardDescription>
                            عدد الطلاب: {group.studentCount}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                    <Dialog>
                      <DialogTrigger>
                        <Card className="flex flex-col h-full items-center justify-center transition duration-500 transform shadow cursor-pointer border-2 border-dashed hover:scale-105 hover:shadow-md">
                          <CardContent className="p-0">
                            <Plus size={48}></Plus>
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            إضافة مجموعة جديدة إلى {circle.name}
                          </DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                          قم بتعبئة النموذج لإضافة مجموعة جديدة
                        </DialogDescription>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-left">
                              اسم المجموعة
                            </Label>
                            <Input
                              id="name"
                              value=""
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">حفظ</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        ))}
      </div>
    </main>
  );
};

export default Circles;