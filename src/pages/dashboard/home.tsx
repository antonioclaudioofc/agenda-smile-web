import { LuNotebookText } from "react-icons/lu";
import { GoPeople } from "react-icons/go";
import { RiToothLine } from "react-icons/ri";
import { CiClock2, CiCalendar } from "react-icons/ci";
import { Button } from "../../components/button";
import { StatCard } from "../../components/dashboard/stat-card";
import { DashboardSection } from "../../components/dashboard/dashboard-section";

export function HomePage() {
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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
          value="0"
          icon={<LuNotebookText className="size-full" />}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-500"
        />
        <StatCard
          title="Total de Pacientes"
          value="0"
          icon={<GoPeople className="size-full" />}
          iconBgColor="bg-green-50"
          iconColor="text-green-500"
        />
        <StatCard
          title="Dentistas Ativos"
          value="0"
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
          <CiCalendar className="size-16 text-gray-300" />
          <p className="text-gray-400">Nenhum atendimento agendado para hoje</p>
        </DashboardSection>

        <DashboardSection
          title="Próximo Atendimento"
          headerAction={<Button variant="outline">Ver Agenda</Button>}
        >
          <GoPeople className="size-16 text-gray-300" />
          <p className="text-gray-400">Nenhum atendimento agendado</p>
          <Button variant="outline">Criar Agendamento</Button>
        </DashboardSection>
      </div>
    </section>
  );
}
