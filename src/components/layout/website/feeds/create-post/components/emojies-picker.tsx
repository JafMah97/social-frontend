import { memo, useCallback } from "react";
import { useEmojiPicker } from "@/providers/emoji-picker-provider";
import TooltipButton from "@/components/layout/custom/tooltip-button";
import { SmileIcon } from "lucide-react";

interface EmojiesPickerProps {
  setPostContent: React.Dispatch<React.SetStateAction<string>>;
}

function EmojiesPicker({ setPostContent }: EmojiesPickerProps) {
  const { openEmojiPicker } = useEmojiPicker();

  const handleEmoji = useCallback(() => {
    openEmojiPicker((emoji) => {
      setPostContent((prev) => prev + emoji);
    });
  }, [openEmojiPicker, setPostContent]);

  return (
    <TooltipButton
      toolTipMessage="Add emoji"
      button={<SmileIcon className="w-5 h-5" />}
      onClick={handleEmoji}
    />
  );
}

export default memo(EmojiesPicker);
