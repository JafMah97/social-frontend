import LanguageSwitcher from "@/components/layout/header/language-switcher";
import { ThemeSwitcher } from "@/components/layout/header/theme-switcher";
import { getDictionary } from "@/utils/translation/dictionary-utils";
import { getCurrentLang } from "@/utils/translation/language-utils";


export default async function Page() {
  const lang = await getCurrentLang()
  const dict = await getDictionary(lang)
  return (
    <div className="p-10 flex flex-row justify-between">
      <LanguageSwitcher/>
      <ThemeSwitcher/>
      <div>
        {dict.test}
      </div>
    </div>
  )
}

