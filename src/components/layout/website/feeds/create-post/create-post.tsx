"use client";

import { useState, useRef } from "react";
import CustomAvatar from "@/components/layout/custom/custom-avatar";
import { useFileUpload } from "@/hooks/use-file-upload";

import { maxChars, maxSizeMB } from "@/constants";
import PostTextarea from "./components/post-textarea";
import PostImagePreview from "./components/post-image-preview";
import PostActionBar from "./components/post-action-bar";

import { useCurrentLoggedUser } from "@/hooks/api-hooks/user-hooks";

import { CreatePostData } from "@/types/api-types";
import { usePostActions } from "@/hooks/api-hooks/use-post-actions";

export default function CreatePost() {
  const [postContent, setPostContent] = useState("");
  const [shake, setShake] = useState(false);
  const textareaRef = useRef(null);


  const [{ files, errors }, { openFileDialog, removeFile, getInputProps }] =
    useFileUpload({
      accept: "image/*",
      maxFiles: 1,
      maxSize: maxSizeMB * 1024 * 1024,
      multiple: false,
    });

  const user = useCurrentLoggedUser();

  const { createPost, isPostCreatePending } = usePostActions({
    limit: 4,
    authorId: undefined,
    format: undefined,
  });

  const handlePost = () => {
    const data: CreatePostData = {
      title: null,
      content: postContent,
      image: (files[0]?.file as File) || null,
      postType: "STANDARD",
      visibility: "PUBLIC",
      startsAt: new Date().toISOString(),
      endsAt: null,
      format: "TEXT",
    };
    createPost(data);
    clearAll();
  };

  const charactersRemaining = maxChars - postContent.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxChars) setPostContent(value);
    else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const clearAll = () => {
    setPostContent("");
    files.forEach((f) => removeFile(f.id));
  };

  if (!user.data?.success) return null;

  const fileErrors = Array.isArray(errors) ? errors : [];

  return (
    <div className="rounded-xl bg-background p-4 md:p-6 shadow-sm">
      <div className="flex gap-3 md:gap-4">
        {user.data?.data.profileImage && (
          <CustomAvatar
            src={user.data.data.profileImage}
            fallback={user.data.data.username.slice(0, 2)}
          />
        )}

        <div className="flex-1">
          <PostTextarea
            value={postContent}
            onChange={handleChange}
            textareaRef={textareaRef}
            shake={shake}
            charactersRemaining={charactersRemaining}
            maxChars={maxChars}
          />

          <input {...getInputProps()} className="hidden" aria-hidden />

          <div className="text-red-500 text-sm my-2 h-4">
            {(fileErrors.length > 0 ) && (
              <>
                {fileErrors.map((err, i) => (
                  <div key={i}>{err}</div>
                ))}
              </>
            )}
          </div>

          <PostActionBar
            openFileDialog={openFileDialog}
            onClear={clearAll}
            canClear={postContent.length > 0 || files.length > 0}
            canPost={postContent.trim().length > 0 || files.length > 0}
            handlePost={handlePost}
            isPending={isPostCreatePending}
            setPostContent={setPostContent}
          />

          <PostImagePreview files={files} removeFile={removeFile} />
        </div>
      </div>
    </div>
  );
}
