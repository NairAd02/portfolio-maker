"use client";

import * as React from "react";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { Label } from "../../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { Calendar } from "../../ui/calendar";
import { Input } from "../../ui/input";

interface Props {
  id: string;
  label?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  showTime?: boolean;
  placeholder?: string;
}

export default function DateTimeInput({
  id,
  label,
  value,
  onChange,
  showTime = false,
  placeholder = "Seleccione una fecha",
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    value
  );

  // Sincroniza el valor externo con el interno
  React.useEffect(() => {
    setInternalDate(value);
  }, [value]);

  // Manejador de cambio de fecha
  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;
    const updatedDate = date;

    // Si ya existe una hora, la preservamos
    if (showTime && internalDate) {
      updatedDate.setHours(internalDate.getHours());
      updatedDate.setMinutes(internalDate.getMinutes());
    }

    setInternalDate(updatedDate);
    onChange?.(updatedDate);
  };

  // Manejador de cambio de hora manual
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    if (!internalDate || !time) return;

    const [hours, minutes] = time.split(":").map(Number);
    const updated = new Date(internalDate);
    updated.setHours(hours);
    updated.setMinutes(minutes);
    setInternalDate(updated);
    onChange?.(updated);
  };

  return (
    <div className="space-y-2 w-full">
      {label && <Label htmlFor={id}>{label}</Label>}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`w-full justify-start text-left font-normal ${
              !internalDate && "text-muted-foreground"
            }`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {internalDate
              ? format(
                  internalDate,
                  showTime ? "dd/MM/yyyy HH:mm" : "dd/MM/yyyy"
                )
              : placeholder}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-4" align="start">
          <Calendar
            mode="single"
            selected={internalDate}
            onSelect={handleDateChange}
          />

          {showTime && (
            <div className="mt-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <Input
                type="time"
                value={internalDate ? format(internalDate, "HH:mm") : ""}
                onChange={handleTimeChange}
                className="w-32"
              />
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
