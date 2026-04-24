import * as React from "react";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdCalendar,
} from "react-icons/io";
import { Button } from "../button";
import { Card } from "../card";
import { cn } from "../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { FaChevronDown } from "react-icons/fa6";

interface WeeklyCalendarProps {
  onDateChange?: (date: Date) => void;
  onProfessionalChange?: (professionalId: string) => void;
}

export function WeeklyCalendar({
  onDateChange,
  onProfessionalChange,
}: WeeklyCalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedProfessional, setSelectedProfessional] =
    React.useState("Todos os Dentistas");

  const startOfWeek = React.useMemo(() => {
    const d = new Date(currentDate);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const start = new Date(d.setDate(diff));
    start.setHours(0, 0, 0, 0);
    return start;
  }, [currentDate]);

  const weekDays = React.useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });
  }, [startOfWeek]);

  const formatMonthRange = () => {
    const firstDay = weekDays[0];
    const lastDay = weekDays[6];

    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
    };
    const yearOptions: Intl.DateTimeFormatOptions = { year: "numeric" };

    const firstPart = firstDay.toLocaleDateString("pt-BR", options);
    const lastPart = lastDay.toLocaleDateString("pt-BR", options);
    const year = lastDay.toLocaleDateString("pt-BR", yearOptions);

    return `${firstPart} - ${lastPart} ${year}`;
  };

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
    onDateChange?.(today);
  };

  const dayNames = [
    "segunda",
    "terça",
    "quarta",
    "quinta",
    "sexta",
    "sábado",
    "domingo",
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handlePrevWeek}
            className="h-9 w-9 rounded-lg border-gray-200 text-gray-600"
          >
            <IoIosArrowBack className="size-5" />
          </Button>

          <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg bg-white text-sm font-medium text-gray-700 shadow-sm">
            <IoMdCalendar className="size-4 text-gray-400" />
            <span>{formatMonthRange()}</span>
          </div>

          <Button
            variant="outline"
            onClick={handleNextWeek}
            className="h-9 w-9 rounded-lg border-gray-200 text-gray-600"
          >
            <IoIosArrowForward className="size-5" />
          </Button>

          <Button
            variant="outline"
            onClick={handleToday}
            className="h-9 px-4 rounded-lg border-gray-200 text-sm font-medium ml-2 text-gray-700 hover:bg-gray-50"
          >
            Hoje
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-10 px-4 flex items-center gap-4 border-gray-200 bg-gray-50/30 hover:bg-gray-50 rounded-xl text-gray-700 font-medium transition-colors"
            >
              {selectedProfessional}
              <FaChevronDown className="size-3 opacity-40" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem
              onClick={() => setSelectedProfessional("Todos os Dentistas")}
            >
              Todos os Dentistas
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSelectedProfessional("Dr. Silva")}
            >
              Dr. Silva
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setSelectedProfessional("Dra. Santos")}
            >
              Dra. Santos
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {weekDays.map((date, index) => {
          const isToday = new Date().toDateString() === date.toDateString();
          const isSelected =
            selectedDate.toDateString() === date.toDateString();

          return (
            <Card
              key={index}
              onClick={() => {
                setSelectedDate(date);
                onDateChange?.(date);
              }}
              className={cn(
                "flex flex-col items-center p-6 min-h-[350px] transition-all duration-300 cursor-pointer border-gray-100 shadow-sm",
                "hover:border-blue-200 hover:shadow-md hover:-translate-y-1",
                isSelected &&
                  "border-blue-500 ring-1 ring-blue-500 bg-blue-50/5",
                isToday && !isSelected && "border-blue-200 bg-blue-50/10",
              )}
            >
              <span
                className={cn(
                  "text-sm font-medium mb-1",
                  isSelected ? "text-blue-600" : "text-gray-400",
                )}
              >
                {dayNames[index]}
              </span>
              <span
                className={cn(
                  "text-3xl font-bold mb-1",
                  isSelected ? "text-blue-700" : "text-gray-900",
                )}
              >
                {date.getDate()}
              </span>
              <span className="text-gray-400 text-xs mb-8">0 consultas</span>

              <div className="mt-auto w-full flex flex-col items-center justify-center text-center py-4">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-2">
                  <IoMdCalendar className="size-5 text-gray-200" />
                </div>
                <p className="text-gray-300 text-sm italic">Nenhuma consulta</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
