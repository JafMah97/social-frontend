import Logo from "@/components/layout/header/logo";
import CompleteProfileForm from "@/components/layout/website/user/complete-profile/complete-profile-form";
import { getDictionary, Lang } from "@/utils/translation/dictionary-utils";

export default async function CompleteProfilePage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const lang = (await params).lang;
  const dict = (await getDictionary(lang)).logo;
  return (
    <div className="home-image ">
      <div className="bg-background/40 backdrop-blur-md custom-height">
        <div className=" flex flex-col items-center justify-center gap-6 py-2 h-full">
          <div className="flex mx-2 w-full sm:w-3/4 flex-col gap-6">
            <CompleteProfileForm lang={lang}>
              <Logo dict={dict} lang={lang} colorInverted />
            </CompleteProfileForm>
          </div>
        </div>
      </div>
    </div>
  );
}
