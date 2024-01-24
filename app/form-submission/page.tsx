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
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className="p-6 space-y-2">
        {/* Message content */}
        <CardTitle>شكرًا لك!</CardTitle>
        <CardDescription>
          تمّ وصول ردّك، يمكنك المتابعة للصفحة الرئيسة او مشاهدة الرد.
        </CardDescription>
        {/* Card actions (buttons) */}
        <CardContent className="flex flex-row gap-2 px-0 pt-6 pb-0">
          {/* Back Button - Should take the user to the main page of his course */}
          <Button asChild>
            <Link href="/">العودة</Link>
          </Button>
          {/* Result Button - Should show the user his answers to the form along with the result */}
          <Button asChild variant="secondary">
            <Link href="/">مشاهدة الرد</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmissionPage;