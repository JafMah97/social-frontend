import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface CustomAvatarProps {
  src?: string; // image source
  fallback?: React.ReactNode; // fallback content (e.g. initials)
  className?: string; // extra classes for Avatar
}

export default function CustomAvatar({
  src,
  fallback = "?", // default fallback
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
