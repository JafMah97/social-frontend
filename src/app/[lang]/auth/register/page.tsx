import Logo from "@/components/layout/header/logo";
import { RegisterForm } from "@/components/layout/website/auth/register/register-form";
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
      <div className="bg-background/40 backdrop-blur-md">
        <div className=" flex min-h-svh flex-col items-center justify-start gap-6 py-2">
          <div className="flex mx-2 w-full sm:w-3/4 flex-col gap-6">
            <RegisterForm lang={lang}>
              <Logo dict={dict} lang={lang} colorInverted />
            </RegisterForm>
          </div>
        </div>
      </div>
    </div>
  );
}
