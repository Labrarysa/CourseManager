import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RegisterByID() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[350px]">
        <CardHeader className="mb-10 text-center">
          <CardTitle>تسجيل الدخول</CardTitle>
          <CardDescription>
            ادخل الرقم الخاص بك للوصول إلى بياناتك
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid items-center w-full gap-4">
              <div className="flex flex-col mb-3 space-y-2">
                <Label htmlFor="name">الرقم الأكاديمي</Label>
                <Input
                  id="name"
                  placeholder="ادخل الرقم الأكاديمي الخاص بالطالب"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button>تقدم</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
