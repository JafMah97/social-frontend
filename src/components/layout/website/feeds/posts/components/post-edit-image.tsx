"use client";

import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";
import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslation } from "@/providers/translation-provider";
import { fmt } from "@/utils/translation/language-utils";
import { useEffect, useState } from "react";
import { maxSizeMB } from "@/constants";

export default function PostEditImage({
  initialImage,
  setImage,
  onInitialRemove,
}: {
  initialImage?: string | null;
  setImage: (file: File | null) => void;
  onInitialRemove: () => void;
}) {
  const dict = useTranslation().uploadImagesPage.cover;
  const maxSize = maxSizeMB * 1024 * 1024;

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
      clearFiles,
    },
  ] = useFileUpload({
    accept: "image/png,image/jpeg,image/jpg,image/webp",
    maxSize,
    maxFiles: 1,
  });

  const previewUrl = files[0]?.preview ?? null;

  useEffect(() => {
    const f = files[0]?.file;
    if (f instanceof File) setImage(f);
  }, [files, setImage]);

  useEffect(() => {
    return () => {
      for (const f of files ?? []) {
        if (f.preview && f.file instanceof File) {
          try {
            URL.revokeObjectURL(f.preview);
          } catch {}
        }
      }
    };
  }, [files]);

  const [removedInitial, setRemovedInitial] = useState(false);
  const showExisting = initialImage && !removedInitial && files.length === 0;

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Errors */}
      <div className="h-5 mt-2">
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

      <div className="relative">
        <div
          className="relative flex min-h-40 sm:min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border-3 border-input border-dashed p-4 transition-colors aspect-video data-[dragging=true]:bg-accent/50"
          data-dragging={isDragging || undefined}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            {...getInputProps()}
            aria-label={dict.uploadImageFile}
            className="sr-only"
          />

          {/* Existing image */}
          {showExisting ? (
            <div className="absolute inset-0 flex items-center justify-center p-2 w-full">
              <Image
                fill
                alt="Existing post image"
                className="rounded object-contain"
                src={initialImage!}
              />
            </div>
          ) : previewUrl ? (
            <div className="absolute inset-0 flex items-center justify-center p-2 w-full">
              <Image
                fill
                alt={
                  (files[0]?.file instanceof File && files[0].file.name) ||
                  dict.uploadAlt
                }
                className="rounded object-contain"
                src={previewUrl}
              />
            </div>
          ) : (
            // Empty dropzone (responsive)
            <div className="flex flex-col sm:flex-row items-center justify-center px-4 py-3 text-center gap-3 w-full">
              <div
                aria-hidden="true"
                className="flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
              >
                <ImageIcon className="size-4 opacity-60" />
              </div>

              <div className="flex flex-col items-center sm:items-start gap-1">
                <p className="font-medium text-sm">{dict.dropHere}</p>
                <p className="text-muted-foreground text-xs">
                  {fmt(dict.fileTypes, { size: maxSizeMB })}
                </p>
              </div>

              <Button
                onClick={openFileDialog}
                variant="outline"
                className="cursor-pointer"
              >
                <UploadIcon
                  aria-hidden="true"
                  className="-ms-1 size-4 opacity-60"
                />
                {dict.selectImage}
              </Button>
            </div>
          )}
        </div>

        {/* Remove button */}
        {(showExisting || previewUrl) && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
            <button
              aria-label={dict.removeImage}
              className="z-50 flex size-7 sm:size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-none transition hover:bg-black/80"
              onClick={() => {
                if (showExisting) {
                  setRemovedInitial(true);
                  setImage(null);
                  onInitialRemove();
                }
                if (files[0]) {
                  removeFile(files[0].id);
                  clearFiles();
                  setImage(null);
                }
              }}
              type="button"
            >
              <XIcon aria-hidden="true" className="size-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
