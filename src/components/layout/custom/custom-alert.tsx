"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface CustomAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dict: {
    title: string;
    description: string;
    cancel: string;
    confirm: string;
  };
  onConfirm:()=>void
}

export default function CustomAlert({
  onOpenChange,
  open,
  dict,
  onConfirm
}: CustomAlertDialogProps) {
  const { title, description, cancel, confirm } = dict;
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-start">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-start">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-row w-full gap-2 justify-end items-center">
          <AlertDialogCancel
            onClick={() => onOpenChange(false)}
            className="cursor-pointer"
          >
            {cancel}
          </AlertDialogCancel>

          <AlertDialogAction className="cursor-pointer" asChild>
            <Button
            className="text-white hover:opacity-55"
            variant={"destructive"}
              onClick={() => {
                onOpenChange(false);
                onConfirm();
              }}
            >
              {confirm}
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
