import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface TooltipButtonProps {
  button: React.ReactNode;
  toolTipMessage: React.ReactNode;
  variant?: "default" | "outline" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  buttonClassName?: string;
  toolTipClassName?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function TooltipButton({
  button,
  toolTipMessage,
  variant = "default",
  size = "default",
  buttonClassName,
  toolTipClassName,
  onClick,
  disabled = false,
}: TooltipButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button
            variant={variant}
            size={size}
            onClick={onClick}
            disabled={disabled}
            className={cn(
              "transition-all duration-200 cursor-pointer",
              disabled && "opacity-50 cursor-not-allowed",
              buttonClassName
            )}
          >
            {button}
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className={cn(
            "px-3 py-1.5 text-xs font-medium bg-popover shadow-lg text-foreground",
            toolTipClassName
          )}
          side="bottom"
        >
          {toolTipMessage}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
