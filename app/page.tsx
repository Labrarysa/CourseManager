"use client";

import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/validators/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const inter = Inter({ subsets: ["latin"] });
type Input = z.infer<typeof registerSchema>;

export default function Home() {
  const { toast } = useToast();
  const [formStep, setFormStep] = React.useState(0);
  const form = useForm<Input>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      confirmPassword: "",
      email: "",
      name: "",
      password: "",
      studentId: "",
      year: "",
    },
  });

  function onSubmit(data: Input) {
    if (data.confirmPassword !== data.password) {
      toast({
        title: "كلمة المرور المدخلة غير متطابقة",
        variant: "destructive",
      });
      return;
    }

    alert(JSON.stringify(data, null, 4));
    console.log(data);
  }

  const goToNextStep = () => {
    switch (formStep) {
      case 0:
        form.trigger(["email", "name", "studentId", "year"]).then((valid) => {
          if (valid) setFormStep(1);
        });
        break;
      case 1:
        form
          .trigger(["fatherName", "fatherEmail", "fatherPhoneNumber"])
          .then((valid) => {
            if (valid) setFormStep(2);
          });
        break;
      default:
        break;
    }
  };

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>انشئ حساب جديد</CardTitle>
          <CardDescription>انشئ حسابك بخطوات بسيطة وسهلة</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="relative space-y-3 overflow-x-hidden"
            >
              <motion.div
                className={cn("space-y-3", {
                  // hidden: formStep == 1,
                })}
                // formStep == 0 -> translateX == 0
                // formStep == 1 -> translateX == '-100%'
                animate={{
                  translateX: `-${formStep * 100}%`,
                }}
                transition={{
                  ease: "easeInOut",
                }}
              >
                {/* name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الإسم الثلاثي</FormLabel>
                      <FormControl>
                        <Input placeholder="ادخل اسمك الثلاثي" {...field} />
                      </FormControl>
                      {/* <FormDescription>
                        This is your public display name.
                      </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <Input placeholder="أدخل بريدك الإلكتروني" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* student id */}
                <FormField
                  control={form.control}
                  name="studentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>السجل المدني</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ادخل رقم السجل المدني الخاص بك"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* year */}
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الصف الدراسي</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الصف الدراسي الحالي" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[
                            "الصف الأول الابتدائي",
                            "الصف الثاني الابتدائي",
                            "الصف الثالث الابتدائي",
                            "الصف الرابع الابتدائي",
                            "الصف الخامس الابتدائي",
                            "الصف السادس الابتدائي",
                            "الصف الأول المتوسط",
                            "الصف الثاني المتوسط",
                            "الصف الثالث المتوسط",
                            "الصف الأول الثانوي",
                            "الصف الثاني الثانوي",
                            "الصف الثالث الثانوي",
                          ].map((year, index) => (
                            <SelectItem
                              value={(index + 1).toString()}
                              key={index}
                            >
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              {/* Father's Information Fields */}
              <motion.div
                className={cn("space-y-3 absolute top-0 left-0 right-0 px-2", {
                  hidden: formStep !== 1,
                })}
                animate={{ translateX: `${100 - formStep * 100}%` }}
                transition={{ ease: "easeInOut" }}
              >
                {/* .trigger(["fatherName", "fatherEmail", "fatherPhoneNumber"]) */}

                <FormField
                  control={form.control}
                  name="fatherName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم ولي الأمر </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ادخل اسم ولي الأمر الثلاثي "
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* email */}
                <FormField
                  control={form.control}
                  name="fatherEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <Input placeholder="أدخل بريدك الإلكتروني" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* student id */}
                <FormField
                  control={form.control}
                  name="fatherPhoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>هاتف ولي الأمر</FormLabel>
                      <FormControl>
                        <Input
                          placeholder=" رقم الهاتف الخاص بولي الأمر"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <motion.div
                className={cn("space-y-3 absolute top-0 left-0 right-0 px-2", {
                  hidden: formStep !== 2,
                })}
                animate={{ translateX: `${-200 + formStep * 100}%` }}
                transition={{ ease: "easeInOut" }}
              >
                {/* password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>كلمة المرور</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ادخل كلمة المرور"
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* confirm password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>تأكيد كلمة المرور</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="أكد كلمة المرور الخاصة بك"
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Buttons */}
              <div className="flex gap-2">
                {/* Submit Button - Visible only on the last step */}
                {formStep === 2 && <Button type="submit">Submit</Button>}

                {/* Next Step Button */}
                {formStep < 2 && (
                  <Button type="button" variant="ghost" onClick={goToNextStep}>
                    Next Step
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </Button>
                )}

                {/* Go Back Button */}
                {formStep > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setFormStep(formStep - 1)}
                  >
                    Go Back
                    <ArrowLeft className="w-4 h-4 mr-2" />
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
