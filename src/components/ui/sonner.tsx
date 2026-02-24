import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-xl group-[.toaster]:rounded-xl group-[.toaster]:px-4 group-[.toaster]:py-3 group-[.toaster]:font-body",
          description: "group-[.toast]:text-muted-foreground group-[.toast]:text-xs",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:font-semibold group-[.toast]:rounded-lg",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:font-medium group-[.toast]:rounded-lg",
          success: "group-[.toaster]:bg-white group-[.toaster]:border-eco-green group-[.toaster]:text-eco-green dark:group-[.toaster]:bg-eco-green dark:group-[.toaster]:text-white",
          error: "group-[.toaster]:bg-white group-[.toaster]:border-destructive group-[.toaster]:text-destructive dark:group-[.toaster]:bg-destructive dark:group-[.toaster]:text-white",
          loading: "group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-primary",
        },
      }}
      position="top-right"
      expand={true}
      richColors
      closeButton
      {...props}
    />
  );
};

export { Toaster, toast };
