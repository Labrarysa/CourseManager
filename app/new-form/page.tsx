"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@supabase/supabase-js";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { boolean, z } from "zod";
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
import { Input } from "@/components/ui/input";
import Section from "@/components/section"; // Import the Section component
import { Checkbox } from "@/components/ui/checkbox";
import { PlusIcon } from "lucide-react";

const formSchema = z.object({
  //id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  is_quiz: z.boolean(),
  sections: z
    .object({
      //id: z.string().uuid(),
      //form_id: z.string().uuid(),
      title: z.string(),
      description: z.string(),
      questions: z
        .object({
          //id: z.string().uuid(),
          //section_id: z.string().uuid(),
          question_text: z.string(),
          type: z.string(),
          metadata: z.object({}),
          //correct_answer_id: z.string().uuid(),
          question_choices: z
            .object({
              //id: z.string().uuid(),
              //question_id: z.string().uuid(),
              choice_text: z.string(),
            })
            .array()
            .min(1),
        })
        .array()
        .min(1),
    })
    .array()
    .min(1),
});

const NewForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      //id: "",
      title: "",
      description: "",
      is_quiz: false,
      sections: [
        {
          //id: "",
          //form_id: "",
          title: "",
          description: "",
          questions: [
            {
              //id: "",
              //section_id: "",
              question_text: "",
              type: "",
              metadata: {},
              //correct_answer_id: "",
              question_choices: [
                {
                  //id: "",
                  //question_id: "",
                  choice_text: "",
                },
              ],
            },
          ],
        },
      ],
    },
  });

  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    name: "sections",
    control: form.control,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <main>
      <section className="m-8">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          نموذج جديد
        </h1>
      </section>
      <Separator />
      <section>
        <Card className="border-0 shadow-none my-8 md:mx-8 lg:mx-16 xl:mx-24 2xl:mx-32">
          <CardHeader className="items-center gap-1">
            <CardTitle>معلومات النموذج</CardTitle>
            <CardDescription>أنشئ نموذجك الخاص حسب احتياجك</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="">
                  <section className="flex flex-col justify-center gap-2 my-8">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>عنوان النموذج</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="أدخل عنوان النموذج"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>وصف النموذج</FormLabel>
                          <FormControl>
                            <Input placeholder="أدخل وصف النموذج" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="is_quiz"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start gap-3 space-y-0 mt-1">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              هذا النموذج عبارة عن اختبار قصير
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </section>
                  <div className="mx-2">
                    <Separator />
                  </div>
                  <div>
                    {sectionFields.map((section, index) => (
                      <Section
                        key={section.id}
                        sectionIndex={index}
                        sectionsLength={sectionFields.length}
                        removeSection={removeSection}
                      />
                    ))}
                  </div>
                  <div className="flex justify-center my-4">
                    <Button
                      type="button"
                      variant={"secondary"}
                      onClick={() =>
                        appendSection({
                          title: "",
                          description: "",
                          questions: [
                            {
                              //id: "",
                              //section_id: "",
                              question_text: "",
                              type: "",
                              metadata: {},
                              //correct_answer_id: "",
                              question_choices: [
                                {
                                  //id: "",
                                  //question_id: "",
                                  choice_text: "",
                                },
                              ],
                            },
                          ],
                        })
                      }
                    >
                      <PlusIcon className="ml-2 w-4 h-4"></PlusIcon>إضافة قسم
                    </Button>
                  </div>
                  <div className="pt-4">
                    <Button type="submit">إنهاء</Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};
export default NewForm;
