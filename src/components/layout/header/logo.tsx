import { Lang } from "@/utils/translation/dictionary-utils";
import Link from "next/link";

export default function Logo({
  dict,
  lang,
  colorInverted = false,
}: {
  dict: { mainChar: string; restChars: string };
  colorInverted?: boolean;
  lang: Lang;
}) {
  return (
    <>
      <Link href={`/${lang}/`} className="h-full flex items-center">
        <span
          className={`${
            colorInverted ? "bg-white" : "bg-primary"
          } inline-block max-h-10 px-2 rounded-lg font-black sm:text-4xl text-2xl`}
        >
          <span className={`${colorInverted ? "text-primary" : "text-white"}`}>
            {dict?.mainChar}
          </span>
        </span>
        <span
          className={`font-black text-4xl ${
            colorInverted ? "text-white" : "text-primary"
          } flex`}
        >
          {dict?.restChars}
        </span>
      </Link>
    </>
  );
}
