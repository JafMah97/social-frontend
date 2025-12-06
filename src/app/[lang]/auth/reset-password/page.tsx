import Logo from "@/components/layout/header/logo";
import { ResetPasswordForm } from "@/components/layout/website/forms/reset-password/reset-password-form";
import { getDictionary, Lang } from "@/utils/translation/dictionary-utils";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Lang }>;
})  {
  const lang = (await params).lang;
  const dict =  (await getDictionary(lang)).logo
  return (
    <div className="home-image h-fit">
      <div className="bg-background/40 backdrop-blur-md h-fit">
        <div className=" flex flex-col items-center justify-start gap-6 py-2">
          <div className="flex mx-2 w-full sm:w-3/4 flex-col gap-6">
            <ResetPasswordForm lang={lang}>
              <Logo dict={dict} lang={lang} colorInverted />
            </ResetPasswordForm>
          </div>
        </div>
      </div>
    </div>
  );
}
