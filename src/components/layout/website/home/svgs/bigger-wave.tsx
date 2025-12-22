import { Lang } from "@/utils/translation/dictionary-utils";
import { isRTL } from "@/utils/translation/language-utils";

export default function BiggerWave({lang}:{
  lang:Lang
}) {
  return (
    <svg
      className={`absolute ${
        isRTL(lang)
          ? "w-[800px] md:w-[1000px] lg:w-[1200px] xl:w-[1400px] right-0 top-0 lg:-top-15 xl:-top-22"
          : "w-[800px] md:w-[1000px] lg:w-[1200px] xl:w-[1400px] left-0 top-0 lg:-top-15 xl:-top-22"
      } z-10 ${
        !isRTL(lang) ? "transform scale-x-[1]" : "transform scale-x-[-1]"
      }`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"

    >
      <path
        fill="#614afc"
        fillOpacity="1"
        d="M0,288L60,293.3C120,299,240,309,360,277.3C480,245,600,171,720,160C840,149,960,203,1080,197.3C1200,192,1320,128,1380,96L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
      ></path>
    </svg>
  );
}
