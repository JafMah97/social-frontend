"use client"
import CustomPopoverMenu from "@/components/layout/custom/custom-popover-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import PostEditDialog from "./post-edit-dialog";
import CustomAlert from "@/components/layout/custom/custom-alert";
import { useState } from "react";
import { useTranslation } from "@/providers/translation-provider";
import { PostDTO, UpdatePostData } from "@/types/api-types";

interface PostActionMenuProps {
  show?:boolean;
  post:PostDTO;
  updatePost:(data:UpdatePostData)=>void
  deletePost:()=>void
}

export default function PostActionMenu({ show ,post ,updatePost ,deletePost  }: PostActionMenuProps) {
  const dictPost = useTranslation().feedsPage.post
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    if (!show) return null;

  return (
    <>
      {show && (
        <CustomPopoverMenu
          open={isPopoverOpen}
          onOpenChange={setIsPopoverOpen}
          trigger={
            <Button
              className="cursor-pointer"
              variant={"ghost"}
              onClick={() => setIsPopoverOpen(true)}
            >
              <EllipsisVertical size={20} />
            </Button>
          }
        >
          <div className="flex flex-col ">
            <Button
              className="justify-start cursor-pointer"
              variant={"ghost"}
              onClick={() => {
                setIsPopoverOpen(false);
                setIsEditDialogOpen(true);
              }}
            >
              {dictPost.edit.confrim}
            </Button>

            <Button
              className="justify-start cursor-pointer"
              variant={"ghost"}
              onClick={() => {
                setIsPopoverOpen(false);
                setIsDeleteAlertOpen(true);
              }}
            >
              {dictPost.delete.confirm}
            </Button>
          </div>
        </CustomPopoverMenu>
      )}
      <PostEditDialog
        editDialogOpen={isEditDialogOpen}
        onEditDialogOpen={setIsEditDialogOpen}
        p={post}
        onConfirm={updatePost}
      />
      <CustomAlert
        open={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
        dict={dictPost.delete}
        onConfirm={deletePost}
      />
    </>
  );
}
