interface PageLoaderProps {
  message?: string;
  className?: string;
}

export function PageLoader({
  message = "Loading...",
  className = "py-24",
}: PageLoaderProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full mb-4" />
      {message && (
        <p className="text-muted-foreground text-sm uppercase tracking-widest">
          {message}
        </p>
      )}
    </div>
  );
}
