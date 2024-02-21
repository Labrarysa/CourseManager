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
import { Trash2, PlusIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Props interface
interface SectionProps {
  sectionIndex: number;
  sectionsLength: number;
  removeSection: (index: number) => void;
}

const Section: React.FC<SectionProps> = ({
  sectionIndex,
  sectionsLength,
  removeSection,
}) => {
  const { control } = useFormContext();
  const { fields: questionFields, append: appendQuestion, remove: removeQuestion } = useFieldArray({
    name: `sections[${sectionIndex}].questions`,
    control,
  });

  return (
    <main className="flex flex-col gap-2 my-8 mx-2">
      <Card>
        <CardHeader className="flex flex-row justify-between space-y-0 mx-2">
          <CardTitle>القسم {sectionIndex + 1}</CardTitle>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="destructive"
                disabled={sectionsLength == 1}
              >
                <Trash2 className="w-4 h-4"></Trash2>
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
          <div className="mx-2">
            <Separator />
          </div>
          {/* Iterate over questions */}
          <section className="my-8">
            {questionFields.map((field, questionIndex) => (
              <Question
                key={field.id}
                questionIndex={questionIndex}
                sectionIndex={sectionIndex}
                questionsLength={questionFields.length}
                removeQuestion={removeQuestion}
              />
            ))}
          </section>
          <section className="flex justify-center m-2">
            <Button
              type="button"
              variant={"secondary"}
              onClick={() =>
                appendQuestion({
                  question_text: "",
                  question_choices: [{ choice_text: "" }],
                })
              }
            >
              <PlusIcon className="ml-2 w-4 h-4"></PlusIcon>إضافة سؤال
            </Button>
          </section>
        </CardContent>
      </Card>
      <section className="flex justify-end"></section>
    </main>
  );
};

export default Section;
