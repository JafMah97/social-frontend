import { Button } from "@/components/ui/button";
import { getDictionary, Lang } from "@/utils/translation/dictionary-utils";
import Link from "next/link";

export default async function AuthButtons({lang,isMobile=false}:{lang:Lang,isMobile?:boolean}) {
  const dict =  (await getDictionary(lang)).navBar.authButtons
  return (
    <>
      <Link href={`/${lang}/auth/login`} className="h-full flex items-center">
        <Button
          variant="ghost"
          className={`h-9 px-4 cursor-pointer text-foreground/80 hover:text-foreground font-medium transition-all duration-200 hover:bg-accent rounded-lg bg-primary/10 ${
            isMobile ? "w-full" : ""
          }`}
          aria-label="Login"
        >
          <span className="text-sm font-medium">{dict.login}</span>
        </Button>
      </Link>

      <Link
        href={`/${lang}/auth/register`}
        className="h-full flex items-center"
      >
        <Button
          className={`h-9 px-4 cursor-pointer bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-200 shadow-sm rounded-lg ${
            isMobile ? "w-full" : ""
          }`}
          aria-label="Register"
        >
          <span className="text-sm font-medium">{dict.register}</span>
        </Button>
      </Link>
    </>
  );
}

{/* <Avatar className="rounded-full w-9 h-9 cursor-pointer">
  <AvatarImage
    className="rounded-full"
    src={"https://github.com/shadcn.png"}
    alt="@shadcn"
  />
  <AvatarFallback className="rounded-full text-sm bg-primary/10 w-9 h-9 block text-center pt-2">
    CN
  </AvatarFallback>
</Avatar>; */}