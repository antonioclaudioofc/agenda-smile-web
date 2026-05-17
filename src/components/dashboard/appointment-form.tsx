import { useForm } from "react-hook-form";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../dialog";
import { Button } from "../button";
import { FieldGroup, Field, FieldLabel, FieldError } from "../field";
import { Input } from "../input";
import { appointmentSchema } from "../../schemas/appointment.schema";
import type { AppointmentSchema, Appointment } from "../../types/appointment";
import {
  useCreateAppointment,
  useUpdateAppointment,
} from "../../hooks/use-appointment";
import { usePatients } from "../../hooks/use-patient";
import { useDentists } from "../../hooks/use-dentist";
import {
  HiOutlineUser,
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineClipboardList,
  HiChevronDown,
} from "react-icons/hi";
import { zodResolver } from "@hookform/resolvers/zod";

interface AppointmentFormProps {
  appointment?: Appointment | null;
  onSuccess: () => void;
  defaultDate?: Date;
}

export function AppointmentForm({
  appointment,
  onSuccess,
  defaultDate,
}: AppointmentFormProps) {
  const { data: patients = [] } = usePatients();
  const { data: dentists = [] } = useDentists();

  const createMutation = useCreateAppointment();
  const updateMutation = useUpdateAppointment();

  const isEditing = !!appointment;

  const form = useForm<AppointmentSchema>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: appointment
      ? {
          patient: String(appointment.patient),
          dentist: String(appointment.dentist),
          date: appointment.date,
          start_time: appointment.start_time,
          end_time: appointment.end_time,
          status: appointment.status,
          notes: appointment.notes || "",
        }
      : {
          patient: "",
          dentist: "",
          date: defaultDate
            ? defaultDate.toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
          start_time: "08:00",
          end_time: "09:00",
          status: "scheduled",
          notes: "",
        },
  });

  const onSubmit = (data: AppointmentSchema) => {
    if (isEditing && appointment) {
      updateMutation.mutate(
        { id: appointment.id, data },
        {
          onSuccess: () => {
            onSuccess();
            form.reset();
          },
        },
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          onSuccess();
          form.reset();
        },
      });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <DialogContent className="sm:max-w-lg">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Agendamento" : "Novo Agendamento"}
          </DialogTitle>
          <DialogDescription>
            Preencha os dados da consulta abaixo.
          </DialogDescription>
        </DialogHeader>

        <FieldGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Paciente</FieldLabel>
              <div className="relative group">
                <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 size-5 pointer-events-none" />
                <select
                  className="w-full pl-10 pr-10 h-12 rounded-xl border border-gray-200 bg-white text-black focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none appearance-none cursor-pointer"
                  {...form.register("patient")}
                >
                  <option value="">Selecione o paciente</option>
                  {patients.map((p: any) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <FieldError>{form.formState.errors.patient?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel>Dentista</FieldLabel>
              <div className="relative group">
                <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 size-5 pointer-events-none" />
                <select
                  className="w-full pl-10 pr-10 h-12 rounded-xl border border-gray-200 bg-white text-black focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none appearance-none cursor-pointer"
                  {...form.register("dentist")}
                >
                  <option value="">Selecione o dentista</option>
                  {dentists.map((d: any) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
              <FieldError>{form.formState.errors.dentist?.message}</FieldError>
            </Field>
          </div>

          <Field>
            <FieldLabel>Data</FieldLabel>
            <div className="relative group">
              <HiOutlineCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
              <Input
                type="date"
                className="pl-10 h-12"
                {...form.register("date")}
              />
            </div>
            <FieldError>{form.formState.errors.date?.message}</FieldError>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Início</FieldLabel>
              <div className="relative group">
                <HiOutlineClock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                <Input
                  type="time"
                  className="pl-10 h-12"
                  {...form.register("start_time")}
                />
              </div>
              <FieldError>
                {form.formState.errors.start_time?.message}
              </FieldError>
            </Field>

            <Field>
              <FieldLabel>Fim</FieldLabel>
              <div className="relative group">
                <HiOutlineClock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
                <Input
                  type="time"
                  className="pl-10 h-12"
                  {...form.register("end_time")}
                />
              </div>
              <FieldError>{form.formState.errors.end_time?.message}</FieldError>
            </Field>
          </div>

          <Field>
            <FieldLabel>Status</FieldLabel>
            <div className="relative group">
              <HiOutlineClipboardList className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
              <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 size-5 pointer-events-none" />
              <select
                className="w-full pl-10 pr-10 h-12 rounded-xl border border-gray-200 bg-white text-black focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none appearance-none cursor-pointer"
                {...form.register("status")}
              >
                <option value="scheduled">Agendado</option>
                <option value="completed">Concluído</option>
                <option value="canceled">Cancelado</option>
              </select>
            </div>
          </Field>

          <Field>
            <FieldLabel>Observações</FieldLabel>
            <textarea
              className="w-full p-4 min-h-[100px] rounded-xl border border-gray-200 bg-white text-black focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
              placeholder="Notas adicionais..."
              {...form.register("notes")}
            />
          </Field>
        </FieldGroup>

        <div className="flex justify-end gap-3">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Salvando..." : isEditing ? "Atualizar" : "Agendar"}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
