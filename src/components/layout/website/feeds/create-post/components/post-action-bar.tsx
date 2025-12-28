"use client";

import TooltipButton from "@/components/layout/custom/tooltip-button";
import { Spinner } from "@/components/ui/spinner";
import { useTranslation } from "@/providers/translation-provider";
import { ImageIcon, LocationEditIcon, VideoIcon } from "lucide-react";
import EmojiesPicker from "./emojies-picker";
import PostPrivacyIndicator from "./post-privacy-indicator";

interface PostActionBarProps {
  canClear: boolean;
  canPost: boolean;
  isPending: boolean;
  openFileDialog: () => void;
  onClear: () => void;
  handlePost: () => void;
  setPostContent: React.Dispatch<React.SetStateAction<string>>;
}

export default function PostActionBar({
  openFileDialog,
  onClear,
  canClear,
  canPost,
  handlePost,
  isPending,
  setPostContent,
}: PostActionBarProps) {
  const dict = useTranslation().createPost;

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-1">
        <TooltipButton
          toolTipMessage={dict.actions.addPhoto}
          button={<ImageIcon className="w-5 h-5" />}
          onClick={openFileDialog}
        />

        <TooltipButton
          toolTipMessage={dict.actions.addLocation}
          button={<LocationEditIcon className="w-5 h-5" />}
        />

        <TooltipButton
          toolTipMessage={dict.actions.videoComingSoon}
          button={<VideoIcon className="w-5 h-5" />}
        />

        {/* Emoji Picker */}
        <EmojiesPicker setPostContent={setPostContent} />
      </div>

      <div className="flex items-center gap-3">
        {canClear && (
          <button
            onClick={onClear}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {dict.actions.clear}
          </button>
        )}
        <PostPrivacyIndicator label={dict.privacyIndicator} />

        <TooltipButton
          toolTipMessage={dict.actions.sharePost}
          button={
            !isPending ? (
              <span className="flex items-center gap-2">
                <span>{dict.actions.post}</span>
              </span>
            ) : (
              <Spinner />
            )
          }
          disabled={!canPost || isPending}
          buttonClassName="px-5 rounded-full font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
          onClick={handlePost}
        />
      </div>
    </div>
  );
}
