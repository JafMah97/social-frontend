"use client";

import { Lang } from "@/utils/translation/dictionary-utils";
import AuthButtons from "../header/auth-buttons";
import UserMenu from "../header/user-menu";
import { useCurrentLoggedUser } from "@/hooks/api-hooks/user-hooks";

export default function AuthNavSection({ lang }: { lang: Lang }) {
  const { data } = useCurrentLoggedUser();
  const isLogged = Boolean(data);
  return (
    <div className="flex items-center gap-4 h-full">
      {isLogged ? (
        <UserMenu lang={lang} isMobile={false} />
      ) : (
        <div>
          <AuthButtons lang={lang} />
        </div>
      )}
    </div>
  );
}
