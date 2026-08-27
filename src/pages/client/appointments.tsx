import { useMemo } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { useAppointments } from "../../hooks/use-appointment";
import { useAuth } from "../../contexts/AuthContext";
import { Card } from "../../components/card";
import { Button } from "../../components/button";
import { cn } from "../../lib/utils";
import type { Appointment } from "../../types/appointment";

const STATUS_LABEL: Record<Appointment["status"], string> = {
  scheduled: "Agendado",
  completed: "Concluído",
  canceled: "Cancelado",
};

const STATUS_STYLE: Record<Appointment["status"], string> = {
  scheduled: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  canceled: "bg-red-100 text-red-700",
};

function StatusBadge({ status }: { status: Appointment["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex h-[22px] items-center rounded-full px-2.5 text-[11.5px] font-medium",
        STATUS_STYLE[status],
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

function formatDateTime(dateStr: string, timeStr: string) {
  const date = new Date(`${dateStr}T${timeStr}`);
  const weekday = date.toLocaleDateString("pt-BR", { weekday: "long" });
  const capitalized = weekday.charAt(0).toUpperCase() + weekday.slice(1);
  return `${capitalized}, ${timeStr.substring(0, 5)}`;
}

export function ClientAppointmentsPage() {
  const { user } = useAuth();
  const {
    data: appointments = [],
    isLoading,
    isError,
    refetch,
  } = useAppointments();

  const { nextAppointment, history } = useMemo(() => {
    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const currentTime = now.toTimeString().split(" ")[0];

    const upcoming = appointments
      .filter((app: Appointment) => {
        if (app.status !== "scheduled") return false;
        if (app.date > today) return true;
        return app.date === today && app.start_time > currentTime;
      })
      .sort((a: Appointment, b: Appointment) => {
        if (a.date !== b.date) return a.date.localeCompare(b.date);
        return a.start_time.localeCompare(b.start_time);
      });

    const next = upcoming[0] || null;

    const rest = appointments
      .filter((app: Appointment) => app.id !== next?.id)
      .sort((a: Appointment, b: Appointment) => {
        if (a.date !== b.date) return b.date.localeCompare(a.date);
        return b.start_time.localeCompare(a.start_time);
      });

    return { nextAppointment: next, history: rest };
  }, [appointments]);

  if (isLoading) {
    return (
      <div className="mx-auto flex max-w-[620px] flex-col gap-5 p-5 md:p-8">
        <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />
        <div className="h-28 animate-pulse rounded-xl bg-gray-200" />
        <div className="h-16 animate-pulse rounded-xl bg-gray-200" />
        <div className="h-16 animate-pulse rounded-xl bg-gray-200" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto flex max-w-[620px] flex-col gap-4 p-5 md:p-8">
        <div className="flex gap-2.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700">
          Não foi possível carregar suas consultas. Verifique sua conexão e
          tente novamente.
        </div>
        <Button variant="outline" onClick={() => refetch()}>
          Tentar novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-[620px] flex-col gap-5 p-5 md:p-8 md:gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl">
          Olá, {user?.first_name || "paciente"}
        </h1>
        <p className="text-sm text-gray-500">
          Acompanhe seus horários na clínica.
        </p>
      </div>

      {nextAppointment ? (
        <Card className="overflow-hidden gap-0 border-blue-200 py-0">
          <div className="flex items-center justify-between bg-blue-50 px-4 py-2">
            <span className="text-[11px] font-medium uppercase tracking-wide text-blue-700">
              Próxima consulta
            </span>
            <StatusBadge status={nextAppointment.status} />
          </div>
          <div className="flex items-center gap-4 p-4">
            <div className="flex size-14 flex-col items-center justify-center rounded-lg bg-blue-500 text-white">
              <span className="text-[10px] uppercase tracking-wide opacity-85">
                {new Date(nextAppointment.date).toLocaleDateString("pt-BR", {
                  month: "short",
                })}
              </span>
              <span className="text-xl font-bold leading-none">
                {new Date(nextAppointment.date).getDate()}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-base font-medium text-gray-900">
                {formatDateTime(
                  nextAppointment.date,
                  nextAppointment.start_time,
                )}
              </span>
              <span className="text-sm text-gray-500">
                {nextAppointment.dentist_name
                  ? `Dr(a). ${nextAppointment.dentist_name}`
                  : "Dentista"}
                {nextAppointment.dentist_specialty &&
                  ` · ${nextAppointment.dentist_specialty}`}
              </span>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="flex flex-col items-center gap-3 px-7 py-8 text-center">
          <div className="flex size-13 items-center justify-center rounded-full bg-blue-50">
            <IoCalendarOutline className="size-6 text-blue-500" />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[15px] font-medium text-gray-900">
              Você ainda não tem consultas agendadas
            </span>
            <span className="text-sm text-gray-500">
              Quando a clínica marcar um horário para você, ele aparece aqui.
            </span>
          </div>
        </Card>
      )}

      {history.length > 0 && (
        <div className="flex flex-col gap-2.5">
          <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Histórico
          </span>
          {history.map((app: Appointment) => (
            <Card
              key={app.id}
              className="flex-row items-center justify-between gap-3 px-4 py-3.5"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-gray-900">
                  {new Date(`${app.date}T00:00:00`).toLocaleDateString("pt-BR")}{" "}
                  · {app.start_time.substring(0, 5)}
                </span>
                <span className="text-[12.5px] text-gray-500">
                  {app.dentist_name ? `Dr(a). ${app.dentist_name}` : "Dentista"}
                  {app.dentist_specialty && ` · ${app.dentist_specialty}`}
                </span>
              </div>
              <StatusBadge status={app.status} />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
