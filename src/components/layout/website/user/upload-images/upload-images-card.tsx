"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Wave from "@/components/layout/website/home/svgs/wave";
import UploadAvatar from "@/components/layout/website/user/upload-images/upload-avatar";
import UploadCover from "@/components/layout/website/user/upload-images/upload-cover";
import React from "react";
import { useTranslation } from "@/providers/translation-provider";
export default function UploadImagesCard({
  children,
}: {
  children?: React.ReactNode;
}) {
  const dict = useTranslation().uploadImagesPage;
  return (
    <Card className="bg-primary/10 relative overflow-hidden z-50 py-15">
      <Wave up className="absolute top-0 w-[1000px] z-10" />
      <CardHeader className="flex flex-col gap-2 items-start justify-between relative z-50 ">
        {children}
        <div>
          <CardTitle className="py-4">{dict.title}</CardTitle>
          <CardDescription>{dict.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <UploadCover />
        <UploadAvatar />
      </CardContent>
      <CardFooter className="flex justify-end gap-4 relative z-50">
        <Button variant="outline">{dict.skip}</Button>
        <Button>{dict.continue}</Button>
      </CardFooter>
      <Wave className="absolute -bottom-1 w-[1000px] z-30" />
    </Card>
  );
}
