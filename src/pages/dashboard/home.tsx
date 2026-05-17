import { LuNotebookText } from "react-icons/lu";
import { GoPeople } from "react-icons/go";
import { RiToothLine } from "react-icons/ri";
import { CiClock2, CiCalendar } from "react-icons/ci";
import { Button } from "../../components/button";
import { StatCard } from "../../components/dashboard/stat-card";
import { DashboardSection } from "../../components/dashboard/dashboard-section";
import { usePatients } from "../../hooks/use-patient";
import { useDentists } from "../../hooks/use-dentist";
import { useAppointments } from "../../hooks/use-appointment";
import { useMemo } from "react";
import type { Appointment } from "../../types/appointment";
import { Link } from "react-router-dom";

export function HomePage() {
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const { data: patients = [] } = usePatients();
  const { data: dentists = [] } = useDentists();
  const { data: appointments = [] as Appointment[] } = useAppointments();

  const appointmentsToday = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return appointments.filter((app: Appointment) => app.date === today);
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const currentTime = now.toTimeString().split(" ")[0];

    const upcoming = appointments
      .filter((app: Appointment) => {
        if (app.date > today) return true;
        if (app.date === today && app.start_time > currentTime) return true;
        return false;
      })
      .sort((a: Appointment, b: Appointment) => {
        if (a.date !== b.date) return a.date.localeCompare(b.date);
        return a.start_time.localeCompare(b.start_time);
      });

    return upcoming[0] || null;
  }, [appointments]);

  return (
    <section className="p-4 md:p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-1">
          Dashboard
        </h1>
        <p className="text-gray-500 capitalize">{currentDate}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <StatCard
          title="Consultas Hoje"
          value={String(appointmentsToday.length)}
          icon={<LuNotebookText className="size-full" />}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-500"
        />
        <StatCard
          title="Total de Pacientes"
          value={String(patients.length)}
          icon={<GoPeople className="size-full" />}
          iconBgColor="bg-green-50"
          iconColor="text-green-500"
        />
        <StatCard
          title="Dentistas Ativos"
          value={String(dentists.length)}
          icon={<RiToothLine className="size-full" />}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <DashboardSection
          title="Próximo Atendimento"
          headerAction={<CiClock2 className="size-5 text-gray-500" />}
        >
          {nextAppointment ? (
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-blue-50 p-4 rounded-full">
                <CiCalendar className="size-8 text-blue-500" />
              </div>
              <div>
                <p className="font-bold text-lg text-gray-900">
                  {nextAppointment.patient_name || "Paciente"}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(
                    nextAppointment.date + "T00:00:00",
                  ).toLocaleDateString("pt-BR")}{" "}
                  às {nextAppointment.start_time.substring(0, 5)}
                </p>
                <p className="text-xs text-gray-400">
                  Com {nextAppointment.dentist_name || "Dentista"}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              <CiCalendar className="size-16 text-gray-300" />
              <p className="text-gray-400">
                Nenhum atendimento futuro agendado
              </p>
            </div>
          )}
        </DashboardSection>

        <DashboardSection
          title="Ações Rápidas"
          headerAction={
            <Link to="/books">
              <Button variant="outline">Ver Agenda</Button>
            </Link>
          }
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <GoPeople className="size-16 text-gray-300" />
            <p className="text-gray-400">
              Gerencie seus pacientes e agendamentos com facilidade.
            </p>
            <div className="flex gap-2">
              <Link to="/patients">
                <Button variant="outline">Novo Paciente</Button>
              </Link>
              <Link to="/books">
                <Button>Novo Agendamento</Button>
              </Link>
            </div>
          </div>
        </DashboardSection>
      </div>
    </section>
  );
}
