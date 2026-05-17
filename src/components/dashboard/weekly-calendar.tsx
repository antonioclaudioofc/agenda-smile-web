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
import { useDentists } from "../../hooks/use-dentist";
import { useAppointments } from "../../hooks/use-appointment";
import type { Appointment } from "../../types/appointment";

interface WeeklyCalendarProps {
  onDateChange?: (date: Date) => void;
  onProfessionalChange?: (professionalId: string) => void;
}

export function WeeklyCalendar({ onDateChange }: WeeklyCalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedProfessionalId, setSelectedProfessionalId] = React.useState<
    string | null
  >(null);

  const { data: dentists = [] } = useDentists();
  const { data: appointments = [] as Appointment[] } = useAppointments();

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

  const getAppointmentsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    return appointments.filter((app: Appointment) => {
      const matchesDate = app.date === dateString;
      const matchesProfessional = selectedProfessionalId
        ? String(app.dentist) === selectedProfessionalId
        : true;
      return matchesDate && matchesProfessional;
    });
  };

  const selectedProfessionalName = React.useMemo(() => {
    if (!selectedProfessionalId) return "Todos os Dentistas";
    const dentist = dentists.find(
      (d: any) => String(d.id) === selectedProfessionalId,
    );
    return dentist ? dentist.name : "Todos os Dentistas";
  }, [selectedProfessionalId, dentists]);

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
              {selectedProfessionalName}
              <FaChevronDown className="size-3 opacity-40" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => setSelectedProfessionalId(null)}>
              Todos os Dentistas
            </DropdownMenuItem>
            {dentists.map((dentist: any) => (
              <DropdownMenuItem
                key={dentist.id}
                onClick={() => setSelectedProfessionalId(String(dentist.id))}
              >
                {dentist.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {weekDays.map((date, index) => {
          const isToday = new Date().toDateString() === date.toDateString();
          const isSelected =
            selectedDate.toDateString() === date.toDateString();
          const dayAppointments = getAppointmentsForDate(date);

          return (
            <Card
              key={index}
              onClick={() => {
                setSelectedDate(date);
                onDateChange?.(date);
              }}
              className={cn(
                "flex flex-col items-center p-4 min-h-[350px] transition-all duration-300 cursor-pointer border-gray-100 shadow-sm",
                "hover:border-blue-200 hover:shadow-md hover:-translate-y-1",
                isSelected &&
                  "border-blue-500 ring-1 ring-blue-500 bg-blue-50/5",
                isToday && !isSelected && "border-blue-200 bg-blue-50/10",
              )}
            >
              <span
                className={cn(
                  "text-sm font-medium mb-1 capitalize",
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
              <span
                className={cn(
                  "text-xs mb-4 font-medium",
                  dayAppointments.length > 0
                    ? "text-blue-600"
                    : "text-gray-400",
                )}
              >
                {dayAppointments.length}{" "}
                {dayAppointments.length === 1 ? "consulta" : "consultas"}
              </span>

              <div className="w-full space-y-2 overflow-y-auto max-h-[200px] pr-1 custom-scrollbar">
                {dayAppointments.length > 0 ? (
                  dayAppointments.map((app: Appointment) => (
                    <div
                      key={app.id}
                      className="p-2 rounded-lg bg-white border border-gray-100 shadow-sm text-left hover:border-blue-100 transition-colors"
                    >
                      <p className="text-xs font-bold text-gray-900 truncate">
                        {app.patient_name || "Paciente"}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[10px] text-gray-500">
                          {app.start_time.substring(0, 5)}
                        </span>
                        <span
                          className={cn(
                            "text-[9px] px-1.5 py-0.5 rounded-full",
                            app.status === "scheduled" &&
                              "bg-blue-50 text-blue-600",
                            app.status === "completed" &&
                              "bg-green-50 text-green-600",
                            app.status === "canceled" &&
                              "bg-red-50 text-red-600",
                          )}
                        >
                          {app.status === "scheduled"
                            ? "Agendado"
                            : app.status === "completed"
                              ? "OK"
                              : "Canc."}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="mt-8 flex flex-col items-center justify-center text-center opacity-40">
                    <IoMdCalendar className="size-6 text-gray-300 mb-2" />
                    <p className="text-gray-400 text-[10px] italic">Vazio</p>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
