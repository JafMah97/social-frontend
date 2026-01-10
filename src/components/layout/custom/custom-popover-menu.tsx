import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CustomPopoverMenuProps {
  trigger: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export default function CustomPopoverMenu({
  trigger,
  open,
  onOpenChange,
  children,
}: CustomPopoverMenuProps) {
  return (
    <Popover  modal={false} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="max-w-30">{children}</PopoverContent>
    </Popover>
  );
}
