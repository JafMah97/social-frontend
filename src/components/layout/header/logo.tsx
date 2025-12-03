import { getDictionary, Lang } from "@/utils/translation/dictionary-utils";
import Link from "next/link";

export default async function Logo({lang}:{lang:Lang}) {
  const dict = (await getDictionary(lang)).logo
  return (
    <>
      <Link href={"/"} className="h-full flex items-center">
        <span className="bg-primary inline-block max-h-10 px-2 rounded-lg font-black sm:text-4xl text-2xl">
          <span className="text-white">{dict.mainChar}</span>
        </span>
        <span className="font-black text-4xl text-primary flex">
          {dict.restChars}
        </span>
      </Link>
    </>
  );
}
