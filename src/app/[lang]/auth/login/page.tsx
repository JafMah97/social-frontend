import Logo from "@/components/layout/header/logo";
import { LoginForm } from "@/components/layout/website/auth/login/login-form";
import { getDictionary, Lang } from "@/utils/translation/dictionary-utils";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const lang = (await params).lang;
  const dict = (await getDictionary(lang)).logo;
  return (
    <div className="home-image">
      <div className="bg-background/40 backdrop-blur-md custom-height">
        <div className=" flex flex-col items-center justify-center gap-6 py-2 h-full">
          <div className="flex mx-2 w-full sm:w-3/4 flex-col gap-6">
            <LoginForm lang={lang}>
              <Logo dict={dict} lang={lang} colorInverted />
            </LoginForm>
          </div>
        </div>
      </div>
    </div>
  );
}
