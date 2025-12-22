"use client";

import {
  AlertCircleIcon,
  CircleUserRoundIcon,
  UploadIcon,
  XIcon,
} from "lucide-react";
import {  useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslation } from "@/providers/translation-provider";
import { useEffect } from "react";
import { maxSizeMB } from "@/constants";

export default function UploadAvatar({
  setAvatar,
}: {
  setAvatar: (file: File | null) => void;
}) {
  const dict = useTranslation().uploadImagesPage.avatar;
  const maxSize = maxSizeMB * 1024 * 1024;

  const [
    { files, isDragging, errors },
    {
      removeFile,
      openFileDialog,
      getInputProps,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      clearFiles,
    },
  ] = useFileUpload({
    accept: "image/*",
    maxSize,
  });

  const previewUrl = files[0]?.preview ?? null;

  // Expose only the real File (or null) to the parent
  useEffect(() => {
    const f = files[0]?.file;
    if (f instanceof File) {
      setAvatar(f);
    } else {
      setAvatar(null);
    }
  }, [files, setAvatar]);

  // Revoke object URLs on unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      for (const f of files ?? []) {
        if (f.preview && f.file instanceof File) {
          try {
            URL.revokeObjectURL(f.preview);
          } catch {
            /* ignore */
          }
        }
      }
    };
  }, [files]);

  return (
    <div className="flex flex-col items-center gap-2 relative">
      <div className="relative inline-flex h-5">
        {/* Drop / click area */}
        <button
          aria-label={previewUrl ? dict.changeImage : dict.uploadImage}
          className="relative cursor-pointer -top-19 flex size-24 bg-primary items-center justify-center overflow-hidden rounded-full border-3 border-input border-dashed outline-none transition-colors hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-disabled:pointer-events-none has-[img]:border-none has-disabled:opacity-50 data-[dragging=true]:bg-accent/50"
          data-dragging={isDragging || undefined}
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          type="button"
        >
          {previewUrl ? (
            <Image
              alt={
                (files[0]?.file instanceof File && files[0].file.name) ||
                dict.uploadedImage
              }
              className="size-full object-cover"
              height={64}
              src={previewUrl}
              style={{ objectFit: "cover" }}
              width={64}
            />
          ) : (
            <div aria-hidden="true">
              <CircleUserRoundIcon className="size-4 opacity-60" />
            </div>
          )}
        </button>

        {previewUrl && (
          <Button
            aria-label={dict.removeImage}
            className="-top-1 -right-1 absolute size-6 rounded-full border-2 border-background shadow-none focus-visible:border-background"
            onClick={() => {
              removeFile(files[0]?.id);
              clearFiles();
            }}
            size="icon"
          >
            <XIcon className="size-3.5" />
          </Button>
        )}

        <input
          {...getInputProps()}
          aria-label={dict.uploadImageFile}
          className="sr-only"
          tabIndex={-1}
        />
      </div>

      <div>
        <Button
          onClick={openFileDialog}
          variant="outline"
          className="cursor-pointer"
        >
          <UploadIcon aria-hidden="true" className="-ms-1 size-4 opacity-60 " />
          {dict.selectImage}
        </Button>
      </div>

      <div className="h-5">
        {errors.length > 0 && (
          <div
            className="flex items-center gap-1 text-destructive text-xs"
            role="alert"
          >
            <AlertCircleIcon className="size-3 shrink-0" />
            <span>{errors[0]}</span>
          </div>
        )}
      </div>
    </div>
  );
}
