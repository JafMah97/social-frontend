"use client";
import { useState } from "react";
import CustomAvatar from "@/components/layout/custom/custom-avatar";
import TooltipButton from "@/components/layout/custom/tooltip-button";
import { Textarea } from "@/components/ui/textarea";
import {
  ImageIcon,
  LocationEditIcon,
  VideoIcon,
  SmileIcon,
  Globe,
} from "lucide-react";
import { maxChars } from "@/constants";
import { useTranslation } from "@/providers/translation-provider";

export default function CreatePost() {
  const [postContent, setPostContent] = useState("");
  const [shake, setShake] = useState(false);
  const charactersRemaining = maxChars - postContent.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setPostContent(value);
    } else {
      // trigger shake when user tries to exceed limit
      setShake(true);
      setTimeout(() => setShake(false), 500); // reset after animation
    }
  };

  const dict = useTranslation().createPost

  return (
    <div className="rounded-xl bg-background p-4 md:p-6 shadow-sm">
      <div className="flex gap-3 md:gap-4 ">
        {/* Avatar */}
        <div className="shrink-0">
          <CustomAvatar
            src="/images/profile-placeholder.jpg"
            fallback={"CN"}
            className="w-11 h-11 md:w-14 md:h-14 ring-2 ring-offset-2 ring-offset-background ring-primary/20"
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-4 ">
          {/* Post Input */}
          <div className="space-y-3">
            <Textarea
              value={postContent}
              onChange={handleChange}
              placeholder={dict.placeholder}
              className="min-h-24 md:min-h-28 border-0 p-4 text-lg resize-none bg-transparent placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:outline-none text-wrap break-all"
            />

            {/* Privacy Indicator */}
            <div className="flex items-center justify-between">
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/15 transition-colors">
                <Globe className="w-4 h-4" />
                <span>{dict.privacyIndicator}</span>
              </button>

              <div
                className={`text-sm transition-colors ${
                  charactersRemaining <= 0
                    ? "text-destructive"
                    : "text-muted-foreground"
                } ${shake ? "animate-shake" : ""}`}
              >
                {charactersRemaining} / {maxChars}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t" />

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Media Actions */}
            <div className="flex items-center gap-1">
              <TooltipButton
                variant="ghost"
                toolTipMessage={dict.actions.addPhoto}
                buttonClassName="rounded-full hover:bg-accent p-2.5"
                button={<ImageIcon className="w-5 h-5 text-primary" />}
              />
              <TooltipButton
                variant="ghost"
                toolTipMessage={dict.actions.addLocation}
                buttonClassName="rounded-full hover:bg-accent p-2.5"
                button={<LocationEditIcon className="w-5 h-5 text-primary" />}
              />
              <TooltipButton
                variant="ghost"
                toolTipMessage={dict.actions.videoComingSoon}
                buttonClassName="rounded-full hover:bg-accent p-2.5"
                button={<VideoIcon className="w-5 h-5 text-muted-foreground" />}
              />
              <TooltipButton
                variant="ghost"
                toolTipMessage={dict.actions.addEmoji}
                buttonClassName="rounded-full hover:bg-accent p-2.5"
                button={<SmileIcon className="w-5 h-5 text-primary" />}
              />
            </div>

            {/* Post Button */}
            <div className="flex items-center gap-3">
              {postContent && (
                <button
                  onClick={() => setPostContent("")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {dict.actions.clear}
                </button>
              )}
              <TooltipButton
                toolTipMessage="Share your post"
                buttonClassName="px-5 rounded-full font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all hover:scale-105"
                button={
                  <span className="flex items-center gap-2">
                    <span>{dict.actions.post}</span>
                  </span>
                }
                disabled={!postContent.trim()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
