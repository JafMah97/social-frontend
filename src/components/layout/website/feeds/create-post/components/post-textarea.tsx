"use client";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "@/providers/translation-provider";
import {  ChangeEventHandler, RefObject } from "react";

interface PostTextAreaProps {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  textareaRef: RefObject<null>;
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
}:PostTextAreaProps) {
  const dict = useTranslation().createPost.placeholder

  return (
    <div className="space-y-2">
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        placeholder={dict.text}
        className={`min-h-18 md:min-h-20 border-0 p-4 text-lg resize-none bg-transparent 
          placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:outline-none break-all
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
        {charactersRemaining} / {maxChars}
      </div>
    </div>
  );
}
