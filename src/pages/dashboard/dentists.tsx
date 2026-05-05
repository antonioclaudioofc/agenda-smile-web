import { IoMdAdd } from "react-icons/io";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import {
  HiOutlineSearch,
  HiSelector,
  HiOutlineUser,
  HiOutlineAcademicCap,
  HiOutlineClock,
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
import { useAuth } from "../../contexts/AuthContext";
import {
  useDentist,
  useCreateDentist,
  useUpdateDentist,
  useDeleteDentist,
} from "../../hooks/use-dentist";
import { dentistSchema } from "../../schemas/dentist.schema";
import type { DentistSchema } from "../../types/dentist";

interface Dentist extends DentistSchema {
  id: string;
}

export function DentistsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDentist, setSelectedDentist] = useState<Dentist | null>(null);
  const { data: dentists = [], isLoading } = useDentist();
  const deleteMutation = useDeleteDentist();

  const handleEdit = (dentist: Dentist) => {
    setSelectedDentist(dentist);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este dentista?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) setSelectedDentist(null);
  };

  return (
    <section className="p-4 md:p-6 lg:p-8 space-y-8">
      <div className="flex flex-row justify-between items-center flex-wrap max-sm:justify-center">
        <header>
          <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-1">
            Dentistas
          </h3>
          <p className="text-gray-500">Gerencie os dentistas da clínica</p>
        </header>
        <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedDentist(null)}>
              <IoMdAdd className="size-5" />
              Novo Dentista
            </Button>
          </DialogTrigger>
          <DentistForm
            dentist={selectedDentist}
            onSuccess={() => handleOpenChange(false)}
          />
        </Dialog>
      </div>

      <Card className="border-gray-200 shadow-sm rounded-xl bg-white overflow-hidden">
        <CardHeader className="p-6 pb-2">
          <CardTitle className="text-xl font-bold text-gray-900 tracking-tight">
            Lista de Dentistas ({dentists.length})
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 pt-0 space-y-6">
          <div className="relative">
            <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
            <input
              placeholder="Buscar por nome ou especialidade..."
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
                      Especialidade{" "}
                      <HiSelector className="text-gray-400 size-4" />
                    </div>
                  </TableHead>
                  <TableHead className="font-bold text-gray-900 px-4 h-14">
                    Horário de Atendimento
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
                      Carregando dentistas...
                    </TableCell>
                  </TableRow>
                ) : dentists.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="h-24 text-center text-gray-500"
                    >
                      Nenhum dentista encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  dentists.map((dentist: any, index: number) => (
                    <TableRow
                      key={dentist.id || index}
                      className="last:border-0 hover:bg-gray-50 transition-colors text-base"
                    >
                      <TableCell className="py-4 px-4 font-bold text-gray-900">
                        {dentist.name}
                      </TableCell>
                      <TableCell className="py-4 px-4 text-gray-700 font-medium">
                        {dentist.specialty || "-"}
                      </TableCell>
                      <TableCell className="py-4 px-4 text-gray-400">
                        {dentist.start_time} - {dentist.end_time}
                      </TableCell>
                      <TableCell className="py-4 px-4 text-right">
                        <div className="flex justify-end items-center gap-4">
                          <button
                            onClick={() => handleEdit(dentist)}
                            className="text-gray-900 hover:text-blue-600 transition-all"
                          >
                            <FaEdit className="size-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(dentist.id)}
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

function DentistForm({
  dentist,
  onSuccess,
}: {
  dentist: Dentist | null;
  onSuccess: () => void;
}) {
  const { user } = useAuth();
  const createMutation = useCreateDentist();
  const updateMutation = useUpdateDentist();

  const isEditing = !!dentist;

  const form = useForm<DentistSchema>({
    resolver: zodResolver(dentistSchema),
    mode: "onChange",
    values: dentist
      ? {
          name: dentist.name,
          specialty: dentist.specialty || "",
          start_time: dentist.start_time,
          end_time: dentist.end_time,
          user: user?.id ? String(user.id) : undefined,
        }
      : {
          name: "",
          specialty: "",
          start_time: "08:00" as any,
          end_time: "18:00" as any,
          user: user?.id ? String(user.id) : undefined,
        },
  });

  const onSubmit = (data: DentistSchema) => {
    const payload = {
      ...data,
      user: user?.id ? String(user.id) : undefined,
    };

    if (isEditing && dentist) {
      updateMutation.mutate(
        { id: dentist.id, data: payload },
        {
          onSuccess: () => {
            onSuccess();
            form.reset();
          },
        },
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          onSuccess();
          form.reset();
        },
      });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <DialogContent className="sm:max-w-md w-full p-0 overflow-hidden border-none shadow-2xl max-sm:h-[100dvh] max-sm:rounded-none max-sm:mx-0">
      <DialogHeader className="p-6 pb-0 max-sm:pt-8">
        <DialogTitle className="text-2xl font-bold text-gray-900">
          {isEditing ? "Editar Dentista" : "Novo Dentista"}
        </DialogTitle>
        <DialogDescription className="text-base text-gray-500">
          {isEditing
            ? "Atualize as informações do dentista."
            : "Cadastre as informações básicas do seu novo dentista."}
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col h-full overflow-y-auto"
      >
        <div className="p-6 pt-2 space-y-5 flex-1">
          <FieldGroup>
            <Field>
              <FieldLabel className="text-gray-700 font-semibold">
                Nome
              </FieldLabel>
              <div className="relative group">
                <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors size-5" />
                <Input
                  placeholder="Ex: Dr. Roberto Alves"
                  className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl text-black placeholder:text-gray-500"
                  {...form.register("name")}
                />
              </div>
              <FieldError>{form.formState.errors.name?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel className="text-gray-700 font-semibold">
                Especialidade
              </FieldLabel>
              <div className="relative group">
                <HiOutlineAcademicCap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors size-5" />
                <Input
                  placeholder="Ex: Implantodontia"
                  className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl text-black placeholder:text-gray-500"
                  {...form.register("specialty")}
                />
              </div>
              <FieldError>
                {form.formState.errors.specialty?.message}
              </FieldError>
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel className="text-gray-700 font-semibold">
                  Início do Atendimento
                </FieldLabel>
                <div className="relative group">
                  <HiOutlineClock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors size-5" />
                  <Input
                    type="time"
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl text-black"
                    {...form.register("start_time")}
                  />
                </div>
                <FieldError>
                  {form.formState.errors.start_time?.message}
                </FieldError>
              </Field>
              <Field>
                <FieldLabel className="text-gray-700 font-semibold">
                  Fim do Atendimento
                </FieldLabel>
                <div className="relative group">
                  <HiOutlineClock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors size-5" />
                  <Input
                    type="time"
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl text-black"
                    {...form.register("end_time")}
                  />
                </div>
                <FieldError>
                  {form.formState.errors.end_time?.message}
                </FieldError>
              </Field>
            </div>
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
