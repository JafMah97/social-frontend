"use client";
import { useState, useRef } from "react";
import CustomAvatar from "@/components/layout/custom/custom-avatar";
import { useTranslation } from "@/providers/translation-provider";
import { useFileUpload } from "@/hooks/use-file-upload";

import { maxChars, maxSizeMB } from "@/constants";
import PostTextarea from "./components/post-textarea";
import PostImagePreview from "./components/post-image-preview";
import PostPrivacyIndicator from "./components/post-privacy-indicator";
import PostActionBar from "./components/post-action-bar";
import { PostData } from "@/types/api-types";
import { useCreatePost, useListPosts } from "@/hooks/api-hooks/post-hooks";
import { toast } from "sonner";
import { useCurrentLoggedUser } from "@/hooks/api-hooks/user-hooks";

export default function CreatePost() {
  const [postContent, setPostContent] = useState("");
  const [shake, setShake] = useState(false);
  const [error, setError] = useState("");
  const textareaRef = useRef(null);

  const dict = useTranslation().createPost;

  const [{ files, errors }, { openFileDialog, removeFile, getInputProps }] =
    useFileUpload({
      accept: "image/*",
      maxFiles: 1,
      maxSize: maxSizeMB * 1024 * 1024,
      multiple: false,
    });

  const posts = useListPosts(1, 10);
  const user = useCurrentLoggedUser();

  const { mutate, isPending } = useCreatePost({
    onSuccess: () => {
      setError("");
      setPostContent("")
      toast.success(dict.toast.success);
      posts.refetch();
    },
    onError: (error) => {
      setError(error.error.message);
      console.log(error);
      toast.error(dict.toast.error);
    },
  });

  const handlePost = () => {
    const data: PostData = {
      title: null,
      content: postContent,
      image: (files[0]?.file as File) || null,
      postType: "STANDARD",
      visibility: "PUBLIC",
      startsAt: new Date().toISOString(),
      endsAt: null,
      format: "TEXT",
    };
    mutate(data);
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

  // ❗ Correct conditional rendering
  if (!user.data?.success) {
    return <></>;
  }

  return (
    <div className="rounded-xl bg-background p-4 md:p-6 shadow-sm">
      <div className="flex gap-3 md:gap-4">
        {/* Avatar */}
        {user.data?.data.profileImage && (
          <CustomAvatar
            src={user.data.data.profileImage}
            fallback={user.data.data.username.slice(0, 2)}
          />
        )}

        {/* Post editor */}
        <div className="flex-1 space-y-4">
          <PostTextarea
            value={postContent}
            onChange={handleChange}
            textareaRef={textareaRef}
            shake={shake}
            charactersRemaining={charactersRemaining}
            maxChars={maxChars}
          />

          <input {...getInputProps()} className="hidden" aria-hidden />

          <PostImagePreview files={files} removeFile={removeFile} />

          <PostPrivacyIndicator label={dict.privacyIndicator} />

          <div className="border-t" />

          <PostActionBar
            openFileDialog={openFileDialog}
            onClear={clearAll}
            canClear={postContent ? true : files.length > 0}
            canPost={postContent.trim() ? true : files.length > 0}
            handlePost={handlePost}
            isPending={isPending}
          />
          <div className="h-5 text-red-500">
            {errors} {error}
          </div>
        </div>
      </div>
    </div>
  );
}
