"use client";

import EditDialog from "@/components/layout/custom/edit-dialog";
import { maxChars } from "@/constants";
import { useCurrentLoggedUser } from "@/hooks/api-hooks/user-hooks";
import { useTranslation } from "@/providers/translation-provider";
import { PostDTO ,UpdatePostData } from "@/types/api-types";
import { useRef, useState } from "react";
import PostTextarea from "../../create-post/components/post-textarea";
import PostEditImage from "./post-edit-image";

interface PostEditDialogProps {
  editDialogOpen: boolean;
  onEditDialogOpen: (open: boolean) => void;
  p: PostDTO;
  onConfirm: (data:UpdatePostData)=>void;
}

export default function PostEditDialog({
  editDialogOpen,
  onEditDialogOpen,
  p,
  onConfirm,
}: PostEditDialogProps) {
  const [postContent, setPostContent] = useState(p.content ?? "");
  const [shake, setShake] = useState(false);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [removedInitial, setRemovedInitial] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const dict = useTranslation().feedsPage.post.edit;
  const user = useCurrentLoggedUser();

  const charactersRemaining = maxChars - postContent.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setPostContent(value);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  if (!user.data?.success) return null;

  const handleEdit = () => {
    const finalImage =
      removedInitial && !newImageFile ? null : newImageFile ?? p.image ?? null;

    const data: UpdatePostData = {
      id:p.id,
      content: postContent,
      image: finalImage,
      format: "TEXT",
      postType: p.postType ?? "STANDARD",
      visibility: p.visibility ?? "PUBLIC",
    };

    // ✅ trigger the mutation
    onConfirm(data);
  };

  // Detect changes precisely
  const contentChanged = postContent.trim() !== (p.content ?? "").trim();
  const imageChanged = !!newImageFile || (p.image && removedInitial);
  const hasChanges = contentChanged || imageChanged;

  return (
    <EditDialog
      dict={dict}
      open={editDialogOpen}
      onOpenChange={onEditDialogOpen}
      onConfirm={handleEdit}
      confirmDisabled={!hasChanges}
    >
      <>
        <PostEditImage
          initialImage={p.image}
          setImage={(file) => setNewImageFile(file)}
          onInitialRemove={() => setRemovedInitial(true)}
        />

        <PostTextarea
          value={postContent}
          onChange={handleChange}
          textareaRef={textareaRef}
          shake={shake}
          charactersRemaining={charactersRemaining}
          maxChars={maxChars}
        />
      </>
    </EditDialog>
  );
}
