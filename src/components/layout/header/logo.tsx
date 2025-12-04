import { getDictionary, Lang } from "@/utils/translation/dictionary-utils";
import Link from "next/link";

export default async function Logo({lang,colorInverted=false}:{lang:Lang,colorInverted?:boolean}) {
  const dict = (await getDictionary(lang)).logo
  console.log(lang)
  return (
    <>
      <Link href={`/${lang}/`} className="h-full flex items-center">
        <span
          className={`${
            colorInverted ? "bg-white" : "bg-primary"
          } inline-block max-h-10 px-2 rounded-lg font-black sm:text-4xl text-2xl`}
        >
          <span className={`${colorInverted ? "text-primary" : "text-white"}`}>
            {dict.mainChar}
          </span>
        </span>
        <span
          className={`font-black text-4xl ${
            colorInverted ? "text-white" : "text-primary"
          } flex`}
        >
          {dict.restChars}
        </span>
      </Link>
    </>
  );
}
