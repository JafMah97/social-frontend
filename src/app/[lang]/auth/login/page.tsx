import Logo from "@/components/layout/header/logo";
import { LoginForm } from "@/components/layout/website/forms/login/login-form";
import { getCurrentLang } from "@/utils/translation/language-utils";

export default async function Page() {
  const lang = await getCurrentLang()
  return (
    <div className="home-image h-fit">
      <div className="bg-background/40 backdrop-blur-md h-fit">
        <div className=" flex flex-col items-center justify-start gap-6 py-2">
          <div className="flex mx-2 w-full sm:w-3/4 flex-col gap-6">
            <LoginForm lang={lang}>
              <Logo lang={lang} colorInverted />
            </LoginForm>
          </div>
        </div>
      </div>
    </div>
  );
}
