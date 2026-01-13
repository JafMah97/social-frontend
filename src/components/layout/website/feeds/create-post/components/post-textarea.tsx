"use client";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "@/providers/translation-provider";
import { ChangeEventHandler, RefObject } from "react";

interface PostTextAreaProps {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  textareaRef: RefObject<HTMLTextAreaElement | null>; // <-- allow null
  shake: boolean;
  charactersRemaining: number;
  maxChars: number;
}


export default function PostTextarea({
  value,
  onChange,
  textareaRef,
  shake,
  charactersRemaining,
  maxChars,
}: PostTextAreaProps) {
  const dict = useTranslation().createPost.placeholder;

  return (
    <div className="space-y-2 w-full">
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        placeholder={dict.text}
        className={`min-h-18 md:min-h-20 border-0 p-4 md:text-lg resize-none bg-primary/10 
          placeholder:text-muted-foreground/70 text-xs  placeholder:text-xs placeholder:md:text-sm focus-visible:ring-0 focus-visible:outline-none break-all
          ${shake ? "animate-shake" : ""}
          
        `}
      />

      <div
        className={`text-sm text-right ${
          charactersRemaining <= 0
            ? "text-destructive"
            : "text-muted-foreground"
        }`}
      >
        <span className="text-xs md:text-sm">

        {charactersRemaining} / {maxChars}
        </span>
      </div>
    </div>
  );
}
