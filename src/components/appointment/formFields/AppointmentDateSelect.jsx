
import React from 'react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

const formatDateDisplay = (dateString) => {
  if (!dateString) return "";
  try {
    return format(parseISO(dateString), 'PPP', { locale: es });
  } catch (error) {
    return "Fecha inválida";
  }
};

const AppointmentDateSelect = ({ value, onValueChange, disabled, availableDates, error, psychologistSelected }) => {
  return (
    <FormItem>
      <FormLabel htmlFor="date">Fecha</FormLabel>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <FormControl>
          <SelectTrigger className={error ? 'border-red-500' : ''}>
            <SelectValue placeholder={psychologistSelected ? "Seleccione una fecha" : "Seleccione psicólogo primero"} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {availableDates.map((date) => (
            <SelectItem key={date} value={date}>{formatDateDisplay(date)}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <FormMessage>{error}</FormMessage>}
    </FormItem>
  );
};

export default AppointmentDateSelect;
