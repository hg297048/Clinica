
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

const AppointmentTimeSelect = ({ value, onValueChange, disabled, availableTimes, error, psychologistAndDateSelected }) => {
  return (
    <FormItem>
      <FormLabel htmlFor="time">Hora</FormLabel>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <FormControl>
          <SelectTrigger className={error ? 'border-red-500' : ''}>
            <SelectValue placeholder={psychologistAndDateSelected ? "Seleccione una hora" : "Seleccione fecha y psicólogo"} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {availableTimes.length > 0 ? (
            availableTimes.map((time) => (<SelectItem key={time} value={time}>{time}</SelectItem>))
          ) : (
            <SelectItem value="" disabled>{psychologistAndDateSelected ? "No hay horarios" : "Seleccione fecha y psicólogo"}</SelectItem>
          )}
        </SelectContent>
      </Select>
      {error && <FormMessage>{error}</FormMessage>}
    </FormItem>
  );
};

export default AppointmentTimeSelect;
