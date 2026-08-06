import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { languages } from "@/i18n";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { i18n } = useTranslation();

  const active =
    languages.find((l) => l.code === i18n.language) ||
    languages.find((l) => i18n.language?.startsWith(l.code)) ||
    languages[0];

  return (
    <div className={`flex items-center gap-1.5 text-foreground/70 ${className}`}>
      <Globe className="w-4 h-4" />
      <select
        value={active.code}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        aria-label="Select language"
        className="bg-transparent text-sm font-medium outline-none cursor-pointer"
      >
        {languages.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSwitcher;
