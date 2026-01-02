"use client";
import { useTranslation } from "@/providers/translation-provider";
import { Lang } from "@/utils/translation/dictionary-utils";
import { isRTL } from "@/utils/translation/language-utils";

import { Edit, HelpCircle, Settings } from "lucide-react";
import Link from "next/link";
import CustomAvatar from "../custom/custom-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import CustomAlertDialog from "../custom/alert-dialog";
import { useLogout } from "@/hooks/api-hooks/auth-hooks";
import { useCurrentLoggedUser } from "@/hooks/api-hooks/user-hooks";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function UserMenu({
  lang,
  isMobile = false,
  onAction,
}: {
  lang: Lang;
  isMobile?: boolean;
  onAction?: () => void;
}) {
  const dict = useTranslation().navBar.userMenu;
  const rtl = isRTL(lang);
  const { data } = useCurrentLoggedUser();
  const queryClient = useQueryClient();
  const logoutMutation = useLogout();
  const logoutHandler = () => {
    logoutMutation.mutate(null, {
      onSuccess: () => {
        if (onAction) {
          onAction();
        }
        queryClient.setQueryData(["currentLoggedUser"], null); // ✅ clear data
        toast.success(dict.logoutSuccess);
      },
      onError: () => {
        toast.error(dict.logoutError);
      },
    });
  };

  return (
    <div
      className={`flex ${
        isMobile ? "flex-col gap-4" : "flex-row gap-2"
      } items-center justify-center gap-2`}
    >
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild aria-label="User menu">
          <div className="flex flex-row gap-2">
            {data?.data && (
              <CustomAvatar
                className="w-10 h-10"
                src={data?.data.profileImage}
                fallback={data?.data.username.slice(0, 2)}
              />
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={rtl ? "start" : "end"}
          className="bg-background text-foreground border border-border rounded-lg"
        >
          <DropdownMenuItem
            dir={rtl ? "rtl" : "ltr"}
            className="w-34 text-sm h-8 p-2 m-2 rounded-sm outline-0 cursor-pointer hover:bg-primary/20 transition-colors hover:text-foreground flex items-center justify-between"
            asChild
          >
            <Link href={`/${lang}/profile`}>
              <span>{dict.profile}</span>
              <Edit className="w-5 h-5" strokeWidth={1} />
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            dir={rtl ? "rtl" : "ltr"}
            className="w-34 text-sm h-8 p-2 m-2 rounded-sm outline-0 cursor-pointer hover:bg-primary/20 transition-colors hover:text-foreground flex items-center justify-between"
            asChild
          >
            <Link href={`/${lang}/settings`}>
              <span>{dict.settings}</span>
              <Settings className="w-5 h-5" strokeWidth={1} />
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            dir={rtl ? "rtl" : "ltr"}
            className="w-34 text-sm h-8 p-2 m-2 rounded-sm outline-0 cursor-pointer hover:bg-primary/20 transition-colors hover:text-foreground flex items-center justify-between"
            asChild
          >
            <Link href={`/${lang}/help`}>
              <span>{dict.help}</span>
              <HelpCircle className="w-5 h-5" strokeWidth={1} />
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CustomAlertDialog
        trigger={
          <Button
            variant="ghost"
            className={`h-9 px-2 md:px-3 cursor-pointer bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-200 shadow-sm rounded-lg ${
              isMobile ? "w-full" : ""
            }`}
            aria-label="logout"
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? <Spinner /> : dict.logout}
          </Button>
        }
        title={dict.title}
        description={dict.description}
        cancelText={dict.cancelText}
        continueText={dict.logout}
        onContinue={logoutHandler}
        isPending={logoutMutation.isPending}
      />
    </div>
  );
}
