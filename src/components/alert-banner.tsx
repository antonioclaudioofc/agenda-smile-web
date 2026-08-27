import type { ReactNode } from "react";
import { CiCircleAlert, CiCircleInfo } from "react-icons/ci";
import { cn } from "../lib/utils";

interface AlertBannerProps {
  children: ReactNode;
  variant?: "error" | "info";
  className?: string;
}

const VARIANT_STYLES = {
  error: {
    container: "border-red-200 bg-red-50 text-red-700",
    icon: "text-red-500",
    Icon: CiCircleAlert,
  },
  info: {
    container: "border-blue-200 bg-blue-50 text-blue-800",
    icon: "text-blue-500",
    Icon: CiCircleInfo,
  },
} as const;

export function AlertBanner({
  children,
  variant = "error",
  className,
}: AlertBannerProps) {
  const { container, icon, Icon } = VARIANT_STYLES[variant];

  return (
    <div
      role={variant === "error" ? "alert" : undefined}
      className={cn(
        "flex gap-2.5 rounded-lg border px-3.5 py-3 text-sm",
        container,
        className,
      )}
    >
      <Icon className={cn("mt-0.5 size-4 shrink-0", icon)} />
      <p className="leading-snug">{children}</p>
    </div>
  );
}
