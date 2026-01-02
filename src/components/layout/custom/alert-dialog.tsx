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

interface CustomAlertDialogProps {
  trigger: React.ReactNode; // parent provides the button
  title: string;
  description: string;
  cancelText?: string;
  continueText?: string;
  onContinue: () => void;
  isPending: boolean;
}

export default function CustomAlertDialog({
  trigger,
  title,
  description,
  cancelText = "Cancel",
  continueText = "Continue",
  onContinue,
  isPending,
}: CustomAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>

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

          <AlertDialogAction
            className="cursor-pointer"
            onClick={onContinue}
            disabled={isPending}
          >
            {continueText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
