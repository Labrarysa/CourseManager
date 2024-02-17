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
import Section from '@/components/section'; // Import the Section component

const formSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  is_quiz: z.boolean(),
  sections: z
    .object({
      id: z.string().uuid(),
      form_id: z.string().uuid(),
      title: z.string(),
      description: z.string(),
      questions: z
        .object({
          id: z.string().uuid(),
          section_id: z.string().uuid(),
          question_text: z.string(),
          type: z.string(),
          metadata: z.object({}),
          correct_answer_id: z.string().uuid(),
          question_choices: z
            .object({
              id: z.string().uuid(),
              question_id: z.string().uuid(),
              choice_text: z.string(),
            })
            .array(),
        })
        .array(),
    })
    .array(),
});

const NewForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      title: "",
      description: "",
      is_quiz: false,
      sections: [
        {
          id: "",
          form_id: "",
          title: "",
          description: "",
          questions: [
            {
              id: "",
              section_id: "",
              question_text: "",
              type: "",
              metadata: {},
              correct_answer_id: "",
              question_choices: [
                {
                  id: "",
                  question_id: "",
                  choice_text: "",
                },
              ],
            },
          ],
        },
      ],
    },
  });

  const { fields: sectionFields, append: appendSection } = useFieldArray({
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
        <div>
          <Card>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div>
                  {sectionFields.map((section, index) => (
                    <Section key={section.id} sectionIndex={index} />
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      appendSection({
                        title: "",
                        description: "",
                        questions: [],
                      })
                    }
                  >
                    Add Section
                  </button>
                  <input type="submit" />
                </div>
              </form>
            </Form>
          </Card>
        </div>
      </section>
    </main>
  );
};
export default NewForm;
