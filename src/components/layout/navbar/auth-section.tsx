"use client";

import { Lang } from "@/utils/translation/dictionary-utils";
import AuthButtons from "../header/auth-buttons";
import UserMenu from "../header/user-menu";
import { useCurrentLoggedUser } from "@/hooks/api-hooks/user/useCurrentLoggedUser";

export default function AuthNavSection({lang}:{lang:Lang}) {
  const { data: loggedUser } = useCurrentLoggedUser();
  return (
    <div className="flex items-center gap-4 h-full">
      {!loggedUser? (

          <AuthButtons lang={lang}/>
      ) : (
        <div>
          <UserMenu lang={lang} isMobile={false} />
        </div>
      )}
    </div>
  );
}
