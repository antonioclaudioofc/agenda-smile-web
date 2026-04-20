import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { cn } from "../../lib/utils";
import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconBgColor?: string;
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  icon,
  iconBgColor = "bg-blue-50",
  iconColor = "text-blue-500",
}: StatCardProps) {
  return (
    <Card className="h-40 flex flex-col justify-between">
      <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
        <div className={cn("p-2 rounded-md", iconBgColor)}>
          <div className={cn("size-5", iconColor)}>{icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
