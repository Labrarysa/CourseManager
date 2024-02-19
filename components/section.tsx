import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import Question from "./question";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

// Props interface
interface SectionProps {
  sectionIndex: number;
  sectionsLength: number;
  removeSection: (index: number) => void; // Add this line
}

const Section: React.FC<SectionProps> = ({ sectionIndex, sectionsLength, removeSection }) => {
  const { control } = useFormContext();
  const { fields: questionFields, append: appendQuestion } = useFieldArray({
    name: `sections[${sectionIndex}].questions`,
    control,
  });

  return (
    <section className="flex flex-col gap-2 my-8">
      <Card>
        <CardHeader>
          <CardTitle>القسم {sectionIndex + 1}</CardTitle>
        </CardHeader>
        <CardContent>
          <section className="flex flex-col justify-center gap-2 my-8">
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عنوان القسم</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل عنوان القسم" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>وصف القسم</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل وصف القسم" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          {/* Iterate over questions */}
          <section className="my-8">
            {questionFields.map((field, questionIndex) => (
              <Question
                key={field.id}
                questionIndex={questionIndex}
                sectionIndex={sectionIndex}
              />
            ))}
          </section>
          <section>
            <Button
              type="button"
              onClick={() =>
                appendQuestion({
                  question_text: "",
                  question_choices: [{ choice_text: "" }],
                })
              }
            >
              إضافة سؤال
            </Button>
          </section>
        </CardContent>
      </Card>
      <section className="flex justify-end">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              variant="destructive"
              disabled={sectionsLength == 1}
            >
              حذف القسم
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
              <AlertDialogDescription>
                عند حذف هذا القسم لن تتمكن من العودة.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>العودة</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeSection(sectionIndex)}
                >
                  حذف القسم
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </section>
  );
};

export default Section;
