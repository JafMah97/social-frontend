import CustomAvatar from "@/components/layout/custom/custom-avatar";
import TooltipButton from "@/components/layout/custom/tooltip-button";
import { Textarea } from "@/components/ui/textarea";
import {
  ImageIcon,
  LocationEditIcon,
  VideoIcon,
  SmileIcon,
  Dot,
} from "lucide-react";

export default function CreatePost() {
  return (
    <>
      <div className="flex flex-row justify-between items-start gap-2 md:gap-4">
        <CustomAvatar
          src="/images/profile-placeholder.jpg"
          fallback={"CN"}
          className="md:w-15 md:h-15 w-10 h-10"
        />
        <div className="flex flex-col justify-between items-center w-full gap-2">
          <Textarea
            placeholder={`What's on your mind?`}
            className="resize-none min-h-20 bg-background dark:bg-background placeholder:text-sm rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
            {/* Here */}
            <div className="flex flex-row justify-between items-center w-full mt-2">
              {/* Reply rule */}
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Dot strokeWidth={10} className="text-green-800 w-5 h-5" />
                <span>Everyone can reply</span>
              </div>

              {/* Character counter */}
              <div className="text-xs text-muted-foreground">
                0 / 5000 characters remaining
              </div>
            </div>
          
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-row gap-2">
              <TooltipButton
                variant="outline"
                toolTipMessage={"Add Photo"}
                buttonClassName="cursor-pointer"
                button={<ImageIcon />}
              />
              <TooltipButton
                variant="outline"
                toolTipMessage={"Add Location"}
                buttonClassName="cursor-pointer"
                button={<LocationEditIcon />}
              />
              <TooltipButton
                variant="outline"
                toolTipMessage={"Videos ,Comming soon!"}
                buttonClassName="cursor-pointer"
                button={<VideoIcon />}
              />
            </div>

            <div className="flex flex-row gap-2 items-center">
              <TooltipButton
                variant="ghost"
                toolTipMessage={"Add emoji"}
                buttonClassName="cursor-pointer"
                button={<SmileIcon />}
              />
              <TooltipButton
                toolTipMessage={"Add Post"}
                buttonClassName="cursor-pointer"
                button={"Post"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
