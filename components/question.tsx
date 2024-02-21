import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
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

// Props interface
interface QuestionProps {
  sectionIndex: number;
  questionIndex: number;
  questionsLength: number;
  removeQuestion: (index: number) => void;
}

const Question: React.FC<QuestionProps> = ({
  questionIndex,
  sectionIndex,
  questionsLength,
  removeQuestion,
}) => {
  const { register, control } = useFormContext(); // Access form methods
  const {
    fields: choiceFields,
    append: appendChoice,
    remove: removeChoice,
  } = useFieldArray({
    name: `sections[${sectionIndex}].questions[${questionIndex}].question_choices`,
    control,
  });

  return (
    <main className="flex flex-col gap-2 my-4 mx-2">
      <Card>
        <CardHeader className="flex flex-row justify-between space-y-0 mx-2">
          <CardTitle>السؤال {questionIndex + 1}</CardTitle>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="destructive"
                disabled={questionsLength == 1}
              >
                <Trash2 className="w-4 h-4"></Trash2>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
                <AlertDialogDescription>
                  عند حذف هذا السؤال لن تتمكن من العودة.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>العودة</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeQuestion(questionIndex)}
                  >
                    حذف السؤال
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
              name="question_text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>محتوى السؤال</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل محتوى السؤال" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2 my-4">
              {choiceFields.map((field, choiceIndex) => (
                <FormField
                  control={control}
                  key={field.id}
                  name="question_choices"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الإجابة {choiceIndex + 1}</FormLabel>
                      <FormControl>
                        <Input placeholder="أدخل الإجابة" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </section>
          <section className="flex justify-center m-2">
            <Button
              type="button"
              variant={"secondary"}
              onClick={() => appendChoice({ choice_text: "" })}
            >
              <PlusIcon className="ml-2 w-4 h-4"></PlusIcon>إضافة جواب
            </Button>
          </section>
        </CardContent>
      </Card>
    </main>
  );
};

export default Question;
