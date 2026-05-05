import { IoMdAdd } from "react-icons/io";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import {
  HiOutlineSearch,
  HiSelector,
  HiOutlineUser,
  HiOutlinePhone,
} from "react-icons/hi";
import { Button } from "../../components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../components/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../../components/dialog";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "../../components/field";
import { Input } from "../../components/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  usePatient,
  usePatients,
  useUpdatePatient,
  useDeletePatient,
} from "../../hooks/use-patient";
import { patientSchema } from "../../schemas/patient.schema";
import type { PatientSchema } from "../../types/patient";
import { maskCPF, maskPhone } from "../../utils/mask";

interface Patient extends PatientSchema {
  id: string;
}

export function PatientsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const { data: patients = [], isLoading } = usePatients();
  const deleteMutation = useDeletePatient();

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este paciente?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) setSelectedPatient(null);
  };

  return (
    <section className="p-4 md:p-6 lg:p-8 space-y-8">
      <div className="flex flex-row justify-between items-center flex-wrap max-sm:justify-center">
        <header>
          <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-1">
            Pacientes
          </h3>
          <p className="text-gray-500">Gerencie os pacientes da clínica</p>
        </header>
        <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedPatient(null)}>
              <IoMdAdd className="size-5" />
              Novo Paciente
            </Button>
          </DialogTrigger>
          <PatientForm
            patient={selectedPatient}
            onSuccess={() => handleOpenChange(false)}
          />
        </Dialog>
      </div>

      <Card className="border-gray-200 shadow-sm rounded-xl bg-white overflow-hidden">
        <CardHeader className="p-6 pb-2">
          <CardTitle className="text-xl font-bold text-gray-900 tracking-tight">
            Lista de Pacientes ({patients.length})
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 pt-0 space-y-6">
          <div className="relative">
            <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
            <input
              placeholder="Buscar por nome ou telefone..."
              className="w-full pl-12 h-12 bg-gray-100 border-none text-black rounded-xl placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all text-base px-4"
            />
          </div>

          <div className="[&_[data-slot=table-container]]:border-0 [&_[data-slot=table-container]]:p-0 [&_[data-slot=table-container]]:bg-transparent [&_[data-slot=table-container]]:shadow-none">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b">
                  <TableHead className="font-bold text-gray-900 px-4 h-14">
                    <div className="flex items-center gap-2">
                      Nome <HiSelector className="text-gray-400 size-4" />
                    </div>
                  </TableHead>
                  <TableHead className="font-bold text-gray-900 px-4 h-14">
                    <div className="flex items-center gap-2">
                      Telefone <HiSelector className="text-gray-400 size-4" />
                    </div>
                  </TableHead>
                  <TableHead className="font-bold text-gray-900 px-4 h-14">
                    Observações
                  </TableHead>
                  <TableHead className="font-bold text-gray-900 px-4 h-14 text-right">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      Carregando pacientes...
                    </TableCell>
                  </TableRow>
                ) : patients.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="h-24 text-center text-gray-500"
                    >
                      Nenhum paciente encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  patients.map((patient: any, index: number) => (
                    <TableRow
                      key={patient.id || index}
                      className="last:border-0 hover:bg-gray-50 transition-colors text-base"
                    >
                      <TableCell className="py-4 px-4 font-bold text-gray-900">
                        {patient.name}
                      </TableCell>
                      <TableCell className="py-4 px-4 text-gray-700 font-medium">
                        {patient.phone}
                      </TableCell>
                      <TableCell className="py-4 px-4 text-gray-400">
                        {patient.notes || "-"}
                      </TableCell>
                      <TableCell className="py-4 px-4 text-right">
                        <div className="flex justify-end items-center gap-4">
                          <button
                            onClick={() => handleEdit(patient)}
                            className="text-gray-900 hover:text-blue-600 transition-all"
                          >
                            <FaEdit className="size-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(patient.id)}
                            className="text-red-500 hover:text-red-700 transition-all"
                          >
                            <FaTrashAlt className="size-5" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function PatientForm({
  patient,
  onSuccess,
}: {
  patient: Patient | null;
  onSuccess: () => void;
}) {
  const createMutation = usePatient();
  const updateMutation = useUpdatePatient();

  const isEditing = !!patient;

  const form = useForm<PatientSchema>({
    resolver: zodResolver(patientSchema),
    mode: "onChange",
    values: patient
      ? {
          name: patient.name,
          cpf: maskCPF(patient.cpf),
          phone: maskPhone(patient.phone),
          notes: patient.notes || "",
        }
      : {
          name: "",
          cpf: "",
          phone: "",
          notes: "",
        },
  });

  const onSubmit = (data: PatientSchema) => {
    if (isEditing && patient) {
      updateMutation.mutate(
        { id: patient.id, data },
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
    <DialogContent className="sm:max-w-full w-full p-0 border-none shadow-2xl  max-sm:inset-0 max-sm:max-w-none max-sm:h-[100dvh] max-sm:rounded-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:left-0 max-sm:top-0">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col h-full overflow-y-auto"
      >
        <DialogHeader className="p-6 pb-0 max-sm:pt-8">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {isEditing ? "Editar Paciente" : "Novo Paciente"}
          </DialogTitle>
          <DialogDescription className="text-base text-gray-500">
            {isEditing
              ? "Atualize as informações do paciente."
              : "Cadastre as informações básicas do seu novo paciente."}
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pt-2 flex-1">
          <FieldGroup>
            <Field>
              <FieldLabel className="text-gray-700 font-semibold">
                Nome
              </FieldLabel>
              <div className="relative group">
                <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors size-5" />
                <Input
                  placeholder="Ex: Ana Maria Silva"
                  className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl"
                  {...form.register("name")}
                />
              </div>
              <FieldError>{form.formState.errors.name?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel className="text-gray-700 font-semibold">
                CPF
              </FieldLabel>
              <div className="relative group">
                <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors size-5" />
                <Input
                  placeholder="000.000.000-00"
                  className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl"
                  {...form.register("cpf")}
                  onChange={(e) => {
                    const maskedValue = maskCPF(e.target.value);
                    form.setValue("cpf", maskedValue);
                  }}
                />
              </div>
              <FieldError>{form.formState.errors.cpf?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel className="text-gray-700 font-semibold">
                Telefone
              </FieldLabel>
              <div className="relative group">
                <HiOutlinePhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors size-5" />
                <Input
                  placeholder="(00) 00000-0000"
                  className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl"
                  {...form.register("phone")}
                  onChange={(e) => {
                    const maskedValue = maskPhone(e.target.value);
                    form.setValue("phone", maskedValue);
                  }}
                />
              </div>
              <FieldError>{form.formState.errors.phone?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel className="text-gray-700 font-semibold">
                Observações
              </FieldLabel>
              <textarea
                placeholder="Ex: Alergias, preferências ou histórico..."
                className="flex min-h-[120px] w-full rounded-xl border border-gray-200 bg-transparent px-4 py-3 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/10 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                {...form.register("notes")}
              />
            </Field>
          </FieldGroup>
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 p-6">
          <DialogClose asChild>
            <Button
              variant="outline"
              type="button"
              className="w-full sm:w-auto h-11 px-8 font-semibold text-gray-600 hover:bg-gray-100"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto h-11 px-8 font-semibold shadow-lg shadow-blue-500/20"
          >
            {isPending ? "Salvando..." : isEditing ? "Atualizar" : "Salvar"}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
