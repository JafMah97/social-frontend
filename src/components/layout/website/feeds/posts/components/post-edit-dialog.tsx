"use client";

import EditDialog from "@/components/layout/custom/edit-dialog";
import { Button } from "@/components/ui/button";
import { maxChars } from "@/constants";
import { useCurrentLoggedUser } from "@/hooks/api-hooks/user-hooks";
import { useTranslation } from "@/providers/translation-provider";
import { PostDTO, PostData } from "@/types/api-types";
import { useRef, useState } from "react";
import PostTextarea from "../../create-post/components/post-textarea";
import PostEditImage from "./post-edit-image";
import { usePostActions } from "@/hooks/api-hooks/use-post-actions";
import { Spinner } from "@/components/ui/spinner";

export default function PostEditDialog({
  isAuthor,
  p,
}: {
  isAuthor: boolean;
  p: PostDTO;
}) {
  const [postContent, setPostContent] = useState(p.content ?? "");
  const [shake, setShake] = useState(false);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [removedInitial, setRemovedInitial] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const dict = useTranslation().feedsPage.post.edit;
  const user = useCurrentLoggedUser();

  const { updatePost, isUpdating } = usePostActions(p);

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
    // ✅ Simplified finalImage logic
    const finalImage =
      removedInitial && !newImageFile ? null : newImageFile ?? p.image ?? null;

    const data: PostData = {
      content: postContent,
      image: finalImage,
      format: "TEXT",
      postType: p.postType ?? "STANDARD",
      visibility: p.visibility ?? "PUBLIC",
    };

    updatePost(data);
  };

  // Detect changes precisely
  const contentChanged = postContent.trim() !== (p.content ?? "").trim();
  const imageChanged = !!newImageFile || (p.image && removedInitial);
  const hasChanges = contentChanged || imageChanged;

  return (
    <EditDialog
      trigger={
        <Button
          disabled={!isAuthor}
          variant="ghost"
          size="sm"
          className="justify-start cursor-pointer"
        >
          {dict.edit}
        </Button>
      }
      cancel={dict.cancel}
      process={isUpdating ? <Spinner /> : dict.process}
      title={dict.title}
      onProcess={handleEdit}
      processDisabled={!hasChanges || isUpdating}
      headerChildren={<></>}
      contentChildren={
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
      }
    />
  );
}
