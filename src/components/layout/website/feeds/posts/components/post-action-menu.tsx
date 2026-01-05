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
import PostEditDialog from "./post-edit-dialog";
import { PostDTO } from "@/types/api-types";

interface PostActionsMenuProps {
  isAuthor: boolean;
  deletePost: () => void;
  isDeleting: boolean;
  post:PostDTO
}

export default function PostActionsMenu({
  isAuthor,
  deletePost,
  isDeleting,
  post
}: PostActionsMenuProps) {
  const dictPost = useTranslation().feedsPage.post
  return (
    <Popover>
      <PopoverTrigger className="text-xs cursor-pointer">
        <EllipsisVertical size={20} />
      </PopoverTrigger>

      <PopoverContent className="text-xs w-30 p-2">
        <div className="flex flex-col gap-2">
          <PostEditDialog isAuthor p={post} />
          
          <CustomAlertDialog
            trigger={
              <Button
                variant="ghost"
                disabled={isDeleting || !isAuthor}
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
      </PopoverContent>
    </Popover>
  );
}
