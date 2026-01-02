"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { useTranslation } from "@/providers/translation-provider";
import { FileWithPreview } from "@/hooks/use-file-upload";

interface PostImagePreviewProps {
  files: FileWithPreview[];
  removeFile: (id: string) => void;
}

export default function PostImagePreview({
  files,
  removeFile,
}: PostImagePreviewProps) {
  const dict = useTranslation().createPost;
  if (files.length === 0) return null;

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm">{dict.upload.uploadedFile}</h3>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="relative rounded-md flex justify-center items-center bg-accent overflow-hidden"
          >
            <Link
              href={file.preview || ""}
              target="_blank"
              className="block w-[150px] h-[200px]"
            >
              <Image
                alt={file.file.name}
                src={file.preview || ""}
                fill
                unoptimized
                className="object-contain"
              />
            </Link>

            <Button
              onClick={() => removeFile(file.id)}
              size="icon"
              className="absolute top-2 right-2 size-6 rounded-full border-2 border-background bg-background/80 backdrop-blur-sm"
            >
              <XIcon className="size-3.5 text-foreground" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
