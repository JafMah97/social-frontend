"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  Suspense,
} from "react";
import dynamic from "next/dynamic";
import { EmojiClickData, Theme } from "emoji-picker-react";
import { Spinner } from "@/components/ui/spinner";
import { useTheme } from "next-themes";
import { XIcon } from "lucide-react";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
});

const previewConfig = {
  showPreview: false,
};

type EmojiCallback = (emoji: string) => void;

interface EmojiPickerContextType {
  openEmojiPicker: (cb: EmojiCallback) => void;
}

const EmojiPickerContext = createContext<EmojiPickerContextType | null>(null);

export function EmojiPickerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [callback, setCallback] = useState<EmojiCallback | null>(null);
  const { resolvedTheme } = useTheme();

  const openEmojiPicker = useCallback((cb: EmojiCallback) => {
    setCallback(() => cb);
    setIsOpen(true);
  }, []);

  const closeEmojiPicker = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSelect = useCallback(
    (emojiData: EmojiClickData) => {
      callback?.(emojiData.emoji);
      // Keep open until user closes manually
    },
    [callback]
  );

  return (
    <EmojiPickerContext.Provider value={{ openEmojiPicker }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 bg-background/50 flex items-center justify-center z-50 "
          onClick={closeEmojiPicker}
        >
          <div
            className="bg-background rounded-xl shadow-xl relative p-4 sm:p-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header row */}
            <div className="flex items-center justify-between mb-2 w-fit">
              <span className="text-sm font-medium text-muted-foreground">
                Pick an emoji
              </span>
              <button
                onClick={closeEmojiPicker}
                className="flex items-center justify-center rounded-full hover:bg-foreground/10 transition p-1"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <Suspense
              fallback={
                <div className="flex items-center justify-center p-8">
                  <Spinner />
                </div>
              }
            >
              <div className="rounded-xl w-fit">
                <EmojiPicker
                lazyLoadEmojis
                width={250}
                className="w-fit p-2"
                  searchDisabled
                  onEmojiClick={handleSelect}
                  previewConfig={previewConfig}
                  theme={resolvedTheme === "dark" ? Theme.DARK : Theme.LIGHT}
                />
              </div>
            </Suspense>
          </div>
        </div>
      )}
    </EmojiPickerContext.Provider>
  );
}

export function useEmojiPicker() {
  const ctx = useContext(EmojiPickerContext);
  if (!ctx)
    throw new Error("useEmojiPicker must be used inside EmojiPickerProvider");
  return ctx;
}
