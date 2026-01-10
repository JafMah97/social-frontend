import { Spinner } from "@/components/ui/spinner";

interface OverlayProps {
  dict: {
    main: string;
    desc: string;
  };
}
export default function Overlay({ dict }: OverlayProps) {
  return (
    <div className="flex justify-center items-center h-fit">
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        role="status"
        aria-live="polite"
        aria-label="Deleting"
      >
        {/* subtle backdrop blur */}
        <div className="absolute top-0 inset-0 bg-black/30 backdrop-blur-sm transition-opacity" />

        {/* centered card */}
        <div className="relative z-10 flex flex-col items-center gap-4 bg-background/95 border border-border rounded-lg p-6 shadow-lg w-[min(92%,420px)]">
          <div className="w-20 h-20 flex items-center justify-center">
            <Spinner className="w-16 h-16 text-red-600 animate-spin" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">{dict.main}</p>
            <p className="mt-1 text-xs text-muted-foreground">{dict.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
