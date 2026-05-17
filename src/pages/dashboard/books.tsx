import * as React from "react";
import { IoMdAdd } from "react-icons/io";
import { Button } from "../../components/button";
import { WeeklyCalendar } from "../../components/dashboard/weekly-calendar";
import {
  Dialog,
  DialogTrigger,
} from "../../components/dialog";
import { AppointmentForm } from "../../components/dashboard/appointment-form";

export function BooksPage() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <section className="p-4 md:p-6 lg:p-8 space-y-8">
      <div className="flex flex-row justify-between items-center flex-wrap max-sm:justify-center">
        <header>
          <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-1">
            Agenda
          </h3>
          <p className="text-gray-500">Gerencie os agendamentos da clínica</p>
        </header>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <IoMdAdd className="size-5" />
              Novo Agendamento
            </Button>
          </DialogTrigger>
          <AppointmentForm 
            onSuccess={() => setIsDialogOpen(false)} 
            defaultDate={selectedDate}
          />
        </Dialog>
      </div>

      <WeeklyCalendar onDateChange={handleDateChange} />
    </section>
  );
}
