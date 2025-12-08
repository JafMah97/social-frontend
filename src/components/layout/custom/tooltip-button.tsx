import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils"; // utility to merge classNames

interface TooltipButtonProps {
  button: React.ReactNode; // label or icon
  toolTipMessage: React.ReactNode; // tooltip text
  variant?: "default" | "outline" | "ghost" | "link"; // match your Button variants
  size?: "default" | "sm" | "lg" | "icon"; // match your Button sizes
  buttonClassName?: string; // extra classes for Button
  toolTipClassName?: string; // extra classes for TooltipContent
  onClick?: () => void; // optional click handler
}

export default function TooltipButton({
  button,
  toolTipMessage,
  variant = "default",
  size = "default",
  buttonClassName,
  toolTipClassName,
  onClick,
}: TooltipButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={variant}
          size={size}
          onClick={onClick}
          className={cn(buttonClassName)}
        >
          {button}
        </Button>
      </TooltipTrigger>
      <TooltipContent className={cn(toolTipClassName)}>
        {toolTipMessage}
      </TooltipContent>
    </Tooltip>
  );
}
