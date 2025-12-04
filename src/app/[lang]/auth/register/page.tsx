import Logo from "@/components/layout/header/logo";
import { RegisterForm } from "@/components/layout/website/forms/register/register-form";
import { getCurrentLang } from "@/utils/translation/language-utils";


export default async function Page() {
  const lang = await getCurrentLang()
  return (
    <div className="home-image ">
      <div className="bg-background/40 backdrop-blur-md">
        <div className=" flex min-h-svh flex-col items-center justify-start gap-6 py-2">
          <div className="flex mx-2 w-full sm:w-3/4 flex-col gap-6">
            <RegisterForm lang={lang}>
              <Logo lang={lang} colorInverted/>
            </RegisterForm>
          </div>
        </div>
      </div>
    </div>
  );
}
