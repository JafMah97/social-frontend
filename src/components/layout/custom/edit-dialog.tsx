"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

interface EditDialogProps {
  dict: {
    title: string;
    description?: string;
    cancel: string;
    confrim: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  confirmDisabled: boolean;
  onConfirm: () => void;
  children: React.ReactNode;
}

export default function EditDialog({
  dict,
  open,
  onOpenChange,
  confirmDisabled,
  onConfirm,
  children,
}: EditDialogProps) {
  const { title, description, cancel, confrim } = dict;
  return (
    <Dialog modal={false} open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
    w-full 
    max-w-[95vw] 
    sm:max-w-lg 
    md:max-w-xl 
    lg:max-w-2xl 
    p-4 sm:p-6 
    rounded-xl 
    gap-3 
    max-h-[90vh] 
    overflow-y-auto
  "
      >
        <DialogHeader>
          <DialogTitle className="m-0 p-0">{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose
            className="cursor-pointer text-xs md:text-sm"
            onClick={() => onOpenChange(false)}
          >
            {cancel}
          </DialogClose>
          <Button
            className="cursor-pointer disabled:cursor-not-allowed text-xs md:text-sm"
            disabled={confirmDisabled}
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            {confrim}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
