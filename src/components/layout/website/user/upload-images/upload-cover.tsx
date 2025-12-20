"use client";

import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";

import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslation } from "@/providers/translation-provider";
import { fmt } from "@/utils/translation/language-utils";

export default function UploadCover() {
  const dict = useTranslation().uploadImagesPage.cover;
  const maxSizeMB = 2;
  const maxSize = maxSizeMB * 1024 * 1024; // 2MB default

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
    },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxSize,
  });
  const previewUrl = files[0]?.preview || null;

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        {/* Drop area */}
        <div
          className="relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl  border-3 border-input border-dashed p-4 transition-colors has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50"
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
          {previewUrl ? (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <Image
                width={1000}
                height={1000}
                alt={files[0]?.file?.name || dict.uploadAlt}
                className="mx-auto max-h-full rounded object-contain"
                src={previewUrl}
              />
            </div>
          ) : (
            <div className="flex flex-row items-center justify-center px-4 py-3 text-center gap-3">
              <div
                aria-hidden="true"
                className="mb-2 hidden md:flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
              >
                <ImageIcon className="size-4 opacity-60 " />
              </div>
              <p className="mb-1.5 font-medium text-sm hidden md:block">
                {dict.dropHere}
              </p>
              <p className="text-muted-foreground text-xs hidden lg:block">
                {fmt(dict.fileTypes, { size: maxSizeMB })}
              </p>
              <Button
                onClick={openFileDialog}
                variant="outline"
                className="cursor-pointer"
              >
                <UploadIcon
                  aria-hidden="true"
                  className="-ms-1 size-4 opacity-60 "
                />
                {dict.selectImage}
              </Button>
            </div>
          )}
        </div>

        {previewUrl && (
          <div className="absolute top-4 right-4">
            <button
              aria-label={dict.removeImage}
              className="z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-none transition-[color,box-shadow] hover:bg-black/80 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              onClick={() => removeFile(files[0]?.id)}
              type="button"
            >
              <XIcon aria-hidden="true" className="size-4" />
            </button>
          </div>
        )}
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
