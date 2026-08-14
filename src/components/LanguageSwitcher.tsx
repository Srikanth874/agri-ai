"use client";

import { useState } from "react";
import { Locale } from "@/lib/translations";

const localeLabels: Record<Locale, string> = {
  en: "EN",
  kn: "ಕನ್ನಡ",
  hi: "हिंदी",
};

export default function LanguageSwitcher({
  locale,
  onChange,
}: {
  locale: Locale;
  onChange: (l: Locale) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 transition-all duration-300 shadow-sm"
        aria-label="Switch language"
      >
        <span className="text-base">🌐</span>
        <span>{localeLabels[locale]}</span>
        <svg
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-32 rounded-xl border border-gray-100 bg-white shadow-xl z-50 overflow-hidden">
          {(Object.keys(localeLabels) as Locale[]).map((l) => (
            <button
              key={l}
              onClick={() => {
                onChange(l);
                setOpen(false);
              }}
              className={`block w-full text-left px-4 py-2.5 text-sm transition-all hover:bg-gray-50 ${
                locale === l
                  ? "text-saffron-600 bg-saffron-50 font-semibold"
                  : "text-gray-600"
              }`}
            >
              {localeLabels[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
