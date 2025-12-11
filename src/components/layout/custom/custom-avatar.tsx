import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface CustomAvatarProps {
  src?: string; 
  fallback?: React.ReactNode; 
  className?: string; 
}

export default function CustomAvatar({
  src,
  fallback = "?",
  className,
}: CustomAvatarProps) {
  return (
    <Avatar
      className={cn(
        "w-9 h-9 rounded-full border-2 border-primary/30",
        className
      )}
    >
      <AvatarImage src={src} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
