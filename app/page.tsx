// Use the client-only imports for the Next.js framework
"use client";

// Importing necessary UI components and hooks from the project's designated paths
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { motion } from "framer-motion"; // For smooth animations
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form"; // Hook for managing form state
import { registerSchema } from "@/validators/auth"; // Zod schema for form validation
import { z } from "zod"; // Zod library for schema definition
import { zodResolver } from "@hookform/resolvers/zod"; // Resolver to integrate Zod with react-hook-form
import React from "react";
import { cn } from "@/lib/utils"; // Utility function for conditional classnames
import { ArrowLeft, ArrowRight } from "lucide-react"; // Icon components
import { useToast } from "@/components/ui/use-toast"; // Hook for showing toast notifications

// Type definition inferred from Zod schema
type Input = z.infer<typeof registerSchema>;

export default function Home() {
  const { toast } = useToast();
  const [formStep, setFormStep] = React.useState(0); // State to manage the current step of the form
  // useForm hook initialization with Zod schema for validation
  const form = useForm<Input>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      // Define default form field values
      confirmPassword: "",
      email: "",
      name: "",
      password: "",
      studentId: "",
      year: "",
      fatherName: "",
      fatherEmail: "",
      fatherPhoneNumber: "",
    },
  });

  // Function to handle form submission
  function onSubmit(data: Input) {
    // Custom validation for password confirmation
    if (data.confirmPassword !== data.password) {
      toast({
        title: "كلمة المرور المدخلة غير متطابقة",
        variant: "destructive",
      });
      return;
    }

    // Alert and log the submitted data (for demonstration purposes)
    alert(JSON.stringify(data, null, 4));
    console.log(data);
  }

  // Function to advance to the next form step
  const goToNextStep = () => {
    // Perform validation checks for each step
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
    // Centering the card on the screen using absolute positioning
    <div className="flex items-center justify-center h-screen">
      {/* Card component that contains the form */}
      <Card className="md:w-[420px] w-[350px]">
        {/* Card header with title and description */}
        <CardHeader className="pt-10 text-center">

          <CardTitle>انشئ حساب جديد</CardTitle>
          <CardDescription>انشئ حسابك بخطوات بسيطة وسهلة</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Form component */}
          <Form {...form}>
            {/* Form element with submission handler */}
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="relative space-y-3 overflow-x-hidden"
            >
              {/* Animated container for form fields */}
              <motion.div
                className={cn("space-y-3")}
                animate={{
                  translateX: `${formStep * 100}%`,
                }}
                transition={{
                  ease: "easeInOut",
                }}
              >
                {/* Name field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الإسم الثلاثي</FormLabel>
                      <FormControl>
                        <Input placeholder="ادخل اسمك الثلاثي" {...field} />
                      </FormControl>
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
                animate={{ translateX: `-${100 - formStep * 100}%` }}
                transition={{ ease: "easeInOut" }}
              >
                {/* father's name */}
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
                {/* father's phone number */}
                <FormField
                  control={form.control}
                  name="fatherPhoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>هاتف ولي الأمر</FormLabel>
                      <FormControl>
                        <Input placeholder="05xxxxxxxx" {...field} />
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

              {/* Navigation buttons */}
              <div className="flex justify-center gap-2">
                {/* Go Back Button */}
                {formStep > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setFormStep(formStep - 1)}
                  >
                    <ArrowRight className="w-4 h-4 ml-2" />
                    عودة
                  </Button>
                )}

                {/* Next Step Button */}
                {formStep < 2 && (
                  <Button type="button" variant="ghost" onClick={goToNextStep}>
                    تقدم
                    <ArrowLeft className="w-4 h-4 mr-2" />
                  </Button>
                )}

                {/* Submit Button - Visible only on the last step */}
                {formStep === 2 && (
                  <Button type="submit" className=" size-md">
                    انهاء
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
