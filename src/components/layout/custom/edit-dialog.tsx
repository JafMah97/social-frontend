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
      <DialogContent className="min-w-3xl gap-3">
        <DialogHeader>
          <DialogTitle className="m-0 p-0">{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose
            className="cursor-pointer"
            onClick={() => onOpenChange(false)}
          >
            {cancel}
          </DialogClose>
          <Button
            className="cursor-pointer disabled:cursor-not-allowed"
            disabled={confirmDisabled}
            onClick={()=>{
              onConfirm();
              onOpenChange(false)
            }}
          >
            {confrim}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
