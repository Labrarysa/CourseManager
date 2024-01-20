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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form"; // Hook for managing form state
import { registerSchema } from "@/validators/auth"; // Zod schema for form validation
import { z } from "zod"; // Zod library for schema definition
import { zodResolver } from "@hookform/resolvers/zod"; // Resolver to integrate Zod with react-hook-form
import React from "react";
import { cn } from "@/lib/utils"; // Utility function for conditional classnames
import { ArrowLeft, ArrowRight } from "lucide-react"; // Icon components
import { useToast } from "@/components/ui/use-toast"; // Hook for showing toast notifications
import { useRouter } from "next/navigation"; // To navigate to other pages
import { createClient } from "@/utils/supabse/client";
import { useMutation } from "@tanstack/react-query";

// Type definition inferred from Zod schema
type Input = z.infer<typeof registerSchema>;

type FormInput = {
  user_key: string;
  form_id: string;
  questions: { question_id: string; answer: string }[];
};

/**
 * Add new form result to the database.
 * @param formInput All data should be inserted.
 */
async function addFormResult({ form_id, questions, user_key }: FormInput) {
  const supabase = createClient();
  for (const question of questions) {
    await supabase.from("form_results").insert({
      form_id,
      question_id: question.question_id,
      answer: question.answer,
      user_key,
    });
  }
}

export default function Home() {
  const router = useRouter();
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
  const { mutate } = useMutation({ mutationFn: addFormResult });

  // Function to handle form submission
  async function onSubmit(data: Input) {
    // Custom validation for password confirmation
    if (data.confirmPassword !== data.password) {
      toast({
        title: "كلمة المرور المدخلة غير متطابقة",
        variant: "destructive",
      });
      return;
    }

    mutate({
      form_id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
      user_key: "2412001",
      questions: [
        {
          question_id: "dddddddd-dddd-dddd-dddd-dddddddddddd",
          answer: data.name,
        },
        {
          question_id: "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee",
          answer: data.email,
        },
        {
          question_id: "ffffffff-ffff-ffff-ffff-ffffffffffff",
          answer: data.studentId,
        },
      ],
    });

    // Navigate to form submission page
    router.push("/form-submission");
  }

  // Function to advance to the next form step
  const goToNextStep = () => {
    // Perform validation checks for each step
    switch (formStep) {
      case 0:
        setFormStep(1);
        break;
      case 1:
        form.trigger(["name", "year"]).then((valid) => {
          if (valid) setFormStep(2);
        });
        break;
      case 2:
        form.trigger(["fatherEmail", "fatherPhoneNumber"]).then((valid) => {
          if (valid) setFormStep(3);
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
              className="relative space-y-3 overflow-x-hidden  h-[250px]"
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
                <AlertDialog>
                  <AlertDialogTrigger className="w-full text-center text-blue-500 ">
                    <span className="underline transition-all duration-300 hover:text-blue-700 ">
                      اضغط هنا
                    </span>{" "}
                    لبدأ عملية التسجيل
                  </AlertDialogTrigger>
                  <AlertDialogContent className="flex flex-col items-center justify-center w-full text-center">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        هل سبق للطالب التسجيل في الدورة مسبقاً ؟
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        إذا كنت قد شاركت في الدورة من قبل، يرجى الضغط على الزر{" "}
                        <span className="font-bold">نعم</span>. وإذا كانت هذه
                        مشاركتك الأولى، فقم بالضغط على الزر{" "}
                        <span className="font-bold">لا</span>.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={goToNextStep}>
                        لا
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          router.push("/form-submission");
                        }}
                      >
                        نعم
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </motion.div>

              {/* Father's Information Fields */}
              <motion.div
                className={cn("space-y-3 absolute top-0 left-0 right-0 px-2", {
                  hidden: formStep !== 1,
                })}
                animate={{ translateX: `-${100 - formStep * 100}%` }}
                transition={{ ease: "easeInOut" }}
              >
                {/* Name field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الإسم الثلاثي</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ادخل اسم الطالب الثلاثي"
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
              <motion.div
                className={cn("space-y-3 absolute top-0 left-0 right-0 px-2", {
                  hidden: formStep !== 2,
                })}
                animate={{ translateX: `${-200 + formStep * 100}%` }}
                transition={{ ease: "easeInOut" }}
              >
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
                {formStep > 0 && formStep < 2 && (
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
