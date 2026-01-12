"use client"
import CustomPopoverMenu from "@/components/layout/custom/custom-popover-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import CustomAlert from "@/components/layout/custom/custom-alert";
import { useState } from "react";
import { useTranslation } from "@/providers/translation-provider";
import { CommentItem, DeleteCommentData, UpdateCommentData } from "@/types/api-types";
import CommentEditDialog from "./comment-edit-dialog";

interface CommentActionMenuProps {
  show?:boolean;
  comment:CommentItem;
  updateComment:(data:UpdateCommentData)=>void
  deleteComment:(data:DeleteCommentData)=>void
}

export default function CommentActionMenu({ show ,comment ,updateComment ,deleteComment  }: CommentActionMenuProps) {
  const dictComment = useTranslation().feedsPage.comments
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const handleDelete = ()=> {
      deleteComment({commentId:comment.id,postId:comment.postId})
    }

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
              {dictComment.edit.confrim}
            </Button>

            <Button
              className="justify-start cursor-pointer"
              variant={"ghost"}
              onClick={() => {
                setIsPopoverOpen(false);
                setIsDeleteAlertOpen(true);
              }}
            >
              {dictComment.delete.confirm}
            </Button>
          </div>
        </CustomPopoverMenu>
      )}
        <CommentEditDialog
        editDialogOpen={isEditDialogOpen}
        onEditDialogOpen={setIsEditDialogOpen}
        comment={comment}
        onConfirm={updateComment}
      />
      <CustomAlert
        open={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
        dict={dictComment.delete}
        onConfirm={handleDelete}
        
      />
    </>
  );
}
