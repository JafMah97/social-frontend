"use client";

import { MoreVertical } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/providers/translation-provider";

interface CommentActionsMenuProps {
  isAuthor: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function CommentActionsMenu({
  isAuthor,
  onEdit,
  onDelete,
}: CommentActionsMenuProps) {
  const dict = useTranslation().feedsPage.comments.commentMenu
  if (!isAuthor) return null;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} className="p-1 cursor-pointer rounded-full hover:bg-foreground/20 transition">
          <MoreVertical size={18} />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="text-xs w-30 p-2">
        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="justify-start"
            onClick={onEdit}
          >
            {dict.edit}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="justify-start text-red-500 hover:bg-red-500/10"
            onClick={onDelete}
          >
            {dict.delete}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
