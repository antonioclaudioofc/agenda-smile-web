import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface DashboardSectionProps {
  title: string;
  headerAction?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function DashboardSection({
  title,
  headerAction,
  children,
  className,
}: DashboardSectionProps) {
  return (
    <div
      className={cn(
        "bg-white border border-gray-200 rounded-xl p-4 w-full h-72 flex flex-col",
        className,
      )}
    >
      <div className="flex justify-between items-center mb-2">
        <p className="font-medium text-base text-gray-800">{title}</p>
        {headerAction}
      </div>

      <div className="flex flex-col justify-center items-center h-full">
        {children}
      </div>
    </div>
  );
}
