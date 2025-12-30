import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "@/providers/translation-provider";
import { fmt } from "@/utils/translation/language-utils";

export function useTimeAgo(date: string | number | Date) {
  const dict = useTranslation().feedsPage.timeAgo;

  const format = useCallback(() => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();

    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (minutes < 1) return dict.justNow;
    if (minutes < 60) return fmt(dict.minutes, { n:minutes });
    if (hours < 24) return fmt(dict.hours, { n:hours });
    if (days < 7) return fmt(dict.days, { n:days });
    if (days < 30) return fmt(dict.weeks, { n:weeks });
    if (days < 365) return fmt(dict.months, { n:months });
    return fmt(dict.years, { n:years });
  }, [date, dict]);

  // Initial value computed once — no effect needed
  const [value, setValue] = useState(() => format());

  useEffect(() => {
    // Only subscribe to interval updates
    const interval = setInterval(() => {
      setValue(format());
    }, 60_000);

    return () => clearInterval(interval);
  }, [format]);

  return value;
}
