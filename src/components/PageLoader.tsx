import { useTranslation } from "react-i18next";

interface PageLoaderProps {
  message?: string;
  className?: string;
}

export function PageLoader({
  message,
  className = "py-24",
}: PageLoaderProps) {
  const { t } = useTranslation();
  const text = message ?? t("common.loading");
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full mb-4" />
      {text && (
        <p className="text-muted-foreground text-sm uppercase tracking-widest">
          {text}
        </p>
      )}
    </div>
  );
}
