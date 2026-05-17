import * as React from "react";
import {
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineClipboardList,
  HiChevronLeft,
  HiChevronRight,
  HiOutlinePencil,
  HiOutlineTrash,
  HiPlus,
} from "react-icons/hi";
import { Button } from "../../components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/dialog";
import { AppointmentForm } from "../../components/dashboard/appointment-form";
import {
  useAppointments,
  useDeleteAppointment,
} from "../../hooks/use-appointment";
import { usePatients } from "../../hooks/use-patient";
import { useDentists } from "../../hooks/use-dentist";
import type { Appointment } from "../../types/appointment";
import { cn } from "../../lib/utils";

export function BooksPage() {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    React.useState<Appointment | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = React.useState<
    string | null
  >(null);

  const { data: appointments = [] } = useAppointments();
  const { data: patients = [] } = usePatients();
  const { data: dentists = [] } = useDentists();
  const deleteMutation = useDeleteAppointment();

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  const handleOpenNew = () => {
    setSelectedAppointment(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (app: Appointment) => {
    setSelectedAppointment(app);
    setIsDialogOpen(true);
  };

  const confirmDelete = (id: string) => {
    setAppointmentToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const executeDelete = () => {
    if (appointmentToDelete) {
      deleteMutation.mutate(appointmentToDelete, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          setAppointmentToDelete(null);
        },
      });
    }
  };

  const appointmentsInMonth = React.useMemo(() => {
    return appointments
      .filter((app: Appointment) => {
        const appDate = new Date(app.date + "T00:00:00");
        return (
          appDate.getMonth() === currentMonth.getMonth() &&
          appDate.getFullYear() === currentMonth.getFullYear()
        );
      })
      .sort((a: Appointment, b: Appointment) => {
        if (a.date !== b.date) return a.date.localeCompare(b.date);
        return a.start_time.localeCompare(b.start_time);
      });
  }, [appointments, currentMonth]);

  const groupedAppointments = React.useMemo(() => {
    return appointmentsInMonth.reduce(
      (acc: Record<string, Appointment[]>, app: Appointment) => {
        if (!acc[app.date]) {
          acc[app.date] = [];
        }
        acc[app.date].push(app);
        return acc;
      },
      {} as Record<string, Appointment[]>,
    );
  }, [appointmentsInMonth]);

  const sortedDates = Object.keys(groupedAppointments).sort();

  return (
    <section className="p-4 md:p-6 lg:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <header>
          <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-1">
            Agenda
          </h3>
          <p className="text-gray-500">
            Gerencie os agendamentos da clínica por mês
          </p>
        </header>

        <Button onClick={handleOpenNew}>
          <HiPlus className="size-5 mr-2" />
          Novo Agendamento
        </Button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="outline"
              onClick={prevMonth}
              className="px-3 md:px-4"
            >
              <HiChevronLeft className="size-5" />
            </Button>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50/50 rounded-xl font-medium text-blue-900 border border-blue-100 min-w-[160px] justify-center">
              <HiOutlineCalendar className="size-5 text-blue-500" />
              <span className="capitalize">
                {currentMonth.toLocaleString("pt-BR", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <Button
              variant="outline"
              onClick={nextMonth}
              className="px-3 md:px-4"
            >
              <HiChevronRight className="size-5" />
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentMonth(new Date())}
              className="hidden md:flex ml-2"
            >
              Mês Atual
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {sortedDates.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiOutlineCalendar className="size-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Nenhum agendamento
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Não há consultas marcadas para este mês. Clique em "Novo
                Agendamento" para adicionar.
              </p>
            </div>
          ) : (
            sortedDates.map((date) => {
              const apps = groupedAppointments[date];
              const dateObj = new Date(date + "T00:00:00");
              const isToday = new Date().toISOString().split("T")[0] === date;

              return (
                <div
                  key={date}
                  className={cn(
                    "bg-white rounded-3xl border shadow-sm overflow-hidden transition-colors",
                    isToday
                      ? "border-blue-200 shadow-blue-500/5 ring-1 ring-blue-50"
                      : "border-gray-100",
                  )}
                >
                  <div
                    className={cn(
                      "px-6 py-4 border-b flex items-center justify-between",
                      isToday
                        ? "bg-blue-50/30 border-blue-100"
                        : "bg-gray-50/50 border-gray-100",
                    )}
                  >
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2 capitalize">
                      {dateObj.toLocaleDateString("pt-BR", { weekday: "long" })}
                      ,{" "}
                      <span
                        className={isToday ? "text-blue-600" : "text-gray-600"}
                      >
                        {dateObj.toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "long",
                        })}
                      </span>
                    </h4>
                    {isToday && (
                      <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full uppercase tracking-wider">
                        Hoje
                      </span>
                    )}
                  </div>
                  <div className="divide-y divide-gray-100">
                    {apps.map((app: Appointment) => {
                      const patientName =
                        app.patient_name ||
                        patients.find(
                          (p: any) => String(p.id) === String(app.patient),
                        )?.name ||
                        "Paciente não informado";
                      const dentistName =
                        app.dentist_name ||
                        dentists.find(
                          (d: any) => String(d.id) === String(app.dentist),
                        )?.name ||
                        "Dentista";

                      return (
                        <div
                          key={app.id}
                          className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => handleEdit(app)}
                        >
                          <div className="flex items-start lg:items-center gap-6 flex-1">
                            <div className="flex flex-col items-center justify-center min-w-[100px] border-r border-gray-100 pr-6">
                              <span className="text-xl font-bold text-gray-900">
                                {app.start_time.substring(0, 5)}
                              </span>
                              <span className="text-sm font-medium text-gray-400">
                                {app.end_time.substring(0, 5)}
                              </span>
                            </div>

                            <div className="space-y-1.5 flex-1">
                              <h5 className="font-bold text-gray-900 text-lg">
                                {patientName}
                              </h5>
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-gray-500">
                                <span className="flex items-center gap-1.5">
                                  <HiOutlineUser className="size-4 text-gray-400" />
                                  {dentistName}
                                </span>
                                {app.notes && (
                                  <span
                                    className="flex items-center gap-1.5 text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md"
                                    title={app.notes}
                                  >
                                    <HiOutlineClipboardList className="size-4" />
                                    Com notas
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between lg:justify-end w-full lg:w-auto gap-4 lg:gap-6 pt-4 lg:pt-0 border-t border-gray-100 lg:border-t-0">
                            <span
                              className={cn(
                                "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider",
                                app.status === "scheduled"
                                  ? "bg-blue-50 text-blue-600"
                                  : app.status === "completed"
                                    ? "bg-green-50 text-green-600"
                                    : "bg-red-50 text-red-600",
                              )}
                            >
                              {app.status === "scheduled"
                                ? "Agendado"
                                : app.status === "completed"
                                  ? "Concluído"
                                  : "Cancelado"}
                            </span>

                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                className="h-10 w-10 p-0 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-xl"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEdit(app);
                                }}
                              >
                                <HiOutlinePencil className="size-5" />
                              </Button>
                              <Button
                                variant="ghost"
                                className="h-10 w-10 p-0 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  confirmDelete(app.id);
                                }}
                                disabled={deleteMutation.isPending}
                              >
                                <HiOutlineTrash className="size-5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AppointmentForm
          key={selectedAppointment ? selectedAppointment.id : "new"}
          appointment={selectedAppointment}
          onSuccess={() => setIsDialogOpen(false)}
          defaultDate={currentMonth}
        />
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center gap-2">
              <HiOutlineTrash className="size-5" />
              Excluir Agendamento
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              Tem certeza que deseja excluir este agendamento? Esta ação não
              pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={deleteMutation.isPending}
            >
              Cancelar
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={executeDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Excluindo..." : "Sim, Excluir"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
