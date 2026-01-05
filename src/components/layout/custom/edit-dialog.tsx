"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function EditDialog({
  contentChildren,
  headerChildren,
  trigger,
  title,
  cancel,
  process,
  processDisabled,
  onProcess,
}: {
  headerChildren: React.ReactNode;
  contentChildren: React.ReactNode;
  trigger: React.ReactNode;
  title: string;
  cancel: string;
  process: React.ReactNode;
  processDisabled:boolean
  onProcess?: () => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="min-w-3xl gap-3">
        <DialogHeader>
          <DialogTitle className="m-0 p-0">{title}</DialogTitle>
          {headerChildren}
        </DialogHeader>
        {contentChildren}
        <DialogFooter>
          <DialogClose className="cursor-pointer">{cancel}</DialogClose>
          <Button className="cursor-pointer disabled:cursor-not-allowed" disabled={processDisabled} onClick={onProcess}>
            {process}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
