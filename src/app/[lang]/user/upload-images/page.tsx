import Logo from "@/components/layout/header/logo";
import UploadImagesCard from "@/components/layout/website/user/upload-images/upload-images-card";
import { getDictionary, Lang } from "@/utils/translation/dictionary-utils";

export default async function UploadImagesPage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const lang = (await params).lang;
  const dict = (await getDictionary(lang)).logo;

  return (
    <div className="home-image custom-height">
      <div className="bg-background/40 backdrop-blur-md w-full h-full flex justify-center items-center">
        <div className="flex mx-2 max-w-3xl sm:w-3/4 flex-col justify-center items-center bg-background rounded-xl">
          <UploadImagesCard lang={lang}>
            <Logo dict={dict} lang={lang} />
          </UploadImagesCard>
        </div>
      </div>
    </div>
  );
}
