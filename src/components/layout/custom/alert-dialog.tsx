import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface CustomAlertDialogProps {
  triggerText: string;
  title: string;
  description: string;
  cancelText?: string;
  continueText?: string;
  onContinue: () => void;
  isMobile: boolean;
  isPending: boolean;
}

export default function CustomAlertDialog({
  triggerText,
  title,
  description,
  cancelText = "Cancel",
  continueText = "Continue",
  onContinue,
  isMobile,
  isPending,
}: CustomAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={`h-9 px-4 cursor-pointer bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-200 shadow-sm rounded-lg ${
            isMobile ? "w-full" : ""
          } `}
          aria-label={triggerText}
          disabled={isPending}
        >
          {isPending ? (
            <Spinner />
          ) : (
            <span className="text-sm font-medium">{triggerText}</span>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-start">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-start">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer" onClick={onContinue}>
            {continueText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
