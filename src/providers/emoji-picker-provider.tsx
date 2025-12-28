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

// Lazy-load the emoji picker so it loads ONLY when opened
const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
});
const  previewConfig = {
  
  showPreview: false
}

type EmojiCallback = (emoji: string) => void;

interface EmojiPickerContextType {
  openEmojiPicker: (cb: EmojiCallback) => void;
}

const EmojiPickerContext = createContext<EmojiPickerContextType | null>(null);

export function EmojiPickerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [callback, setCallback] = useState<EmojiCallback | null>(null);
  const {resolvedTheme} = useTheme()

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
      // ❗ DO NOT CLOSE — user must close manually
    },
    [callback]
  );

  return (
    <EmojiPickerContext.Provider value={{ openEmojiPicker }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 bg-background/50 flex items-center justify-center z-50"
          onClick={closeEmojiPicker}
        >
          <div
            className="bg-background p-3 rounded-xl shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeEmojiPicker}
              className="absolute top-0 w-full right-2 text-muted-foreground hover:text-foreground"
            >
              <XIcon   className="p-2 w-10 h-10"/>
            </button>

            <Suspense fallback={<Spinner />}>
              <div className="rounded-xl p-2">
                <EmojiPicker
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
