"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { EllipsisVertical } from "lucide-react";
import CustomAlertDialog from "@/components/layout/custom/alert-dialog";
import { useTranslation } from "@/providers/translation-provider";

interface PostActionsMenuProps {
  isAuthor: boolean;
  deletePost: () => void;
  isDeleting: boolean;
}

export default function PostActionsMenu({
  isAuthor,
  deletePost,
  isDeleting,
}: PostActionsMenuProps) {
  const dictPost = useTranslation().feedsPage.post
  return (
    <Popover>
      <PopoverTrigger className="text-xs cursor-pointer">
        <EllipsisVertical size={20} />
      </PopoverTrigger>

      <PopoverContent className="text-xs w-30 p-2">
        {isAuthor ? (
          <div className="flex flex-col gap-2">
            <Button variant="ghost" size="sm" className="justify-start cursor-pointer">
              {dictPost.edit}
            </Button>
            <CustomAlertDialog
              trigger={
                <Button
                  variant="ghost"
                  disabled={isDeleting}
                  className="justify-start text-red-500 cursor-pointer"
                >
                  {isDeleting ? <Spinner /> : dictPost.delete}
                </Button>
              }
              title={dictPost.deleteTitle}
              description={dictPost.deleteDescription}
              continueText={dictPost.deleteConfirm}
              cancelText={dictPost.deleteCancel}
              onContinue={deletePost}
              isPending={isDeleting}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Button variant="ghost" size="sm">
              {dictPost.report}
            </Button>

            <Button variant="ghost" size="sm">
              {dictPost.hide}
            </Button>

            <Button variant="ghost" size="sm">
              {dictPost.share}
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
