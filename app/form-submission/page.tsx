import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

const SubmissionPage = () => {
  return (
    <div className="flex justify-center m-6">
      <Card className="p-6 space-y-2">
        {/* Message content */}
        <CardTitle>شكرًا لك!</CardTitle>
        <CardDescription>
          تمّ وصول ردّك، يمكنك المتابعة لصفحة الحلقة او مشاهدة النتيجة.
        </CardDescription>
        {/* Card actions (buttons) */}
        <CardContent className="flex flex-row gap-2 px-0 pt-6 pb-0">
          {/* Back Button - Should take the user to the main page of his course */}
          <Button asChild>
            <Link href="/">العودة</Link>
          </Button>
          {/* Result Button - Should show the user his answers to the form along with the result */}
          <Button asChild variant="secondary">
            <Link href="/">مشاهدة النتيجة</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmissionPage;
