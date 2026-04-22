import { IoMdAdd } from "react-icons/io";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { HiOutlineSearch, HiSelector } from "react-icons/hi";
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

const dentists = [
  {
    nome: "Dr. Roberto Alves",
    especialidade: "Implantodontia",
    horario: "09:00 - 18:00",
  },
  {
    nome: "Dr. Roberto Alves",
    especialidade: "Implantodontia",
    horario: "09:00 - 18:00",
  },
];

export function DentistsPage() {
  return (
    <section className="p-4 md:p-6 lg:p-8 space-y-8">
      <div className="flex flex-row justify-between items-center flex-wrap max-sm:justify-center">
        <header>
          <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-1">
            Dentistas
          </h3>
          <p className="text-gray-500">Gerencie os dentistas da clínica</p>
        </header>
        <Button>
          <IoMdAdd className="size-5" />
          Novo Dentista
        </Button>
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
                {dentists.map((patient, index) => (
                  <TableRow
                    key={index}
                    className="last:border-0 hover:bg-gray-50 transition-colors text-base"
                  >
                    <TableCell className="py-4 px-4 font-bold text-gray-900">
                      {patient.nome}
                    </TableCell>
                    <TableCell className="py-4 px-4 text-gray-700 font-medium">
                      {patient.especialidade}
                    </TableCell>
                    <TableCell className="py-4 px-4 text-gray-400">
                      {patient.horario}
                    </TableCell>
                    <TableCell className="py-4 px-4 text-right">
                      <div className="flex justify-end items-center gap-4">
                        <button className="text-gray-900 hover:text-blue-600 transition-all">
                          <FaEdit className="size-5" />
                        </button>
                        <button className="text-red-500 hover:text-red-700 transition-all">
                          <FaTrashAlt className="size-5" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
