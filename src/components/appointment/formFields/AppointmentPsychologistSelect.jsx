
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

const AppointmentPsychologistSelect = ({ value, onValueChange, psychologists, error, disabled }) => {
  return (
    <FormItem>
      <FormLabel htmlFor="psychologist">Psicólogo</FormLabel>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <FormControl>
          <SelectTrigger className={error ? 'border-red-500' : ''}>
            <SelectValue placeholder="Seleccione un psicólogo" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {psychologists.map((psy) => (
            <SelectItem key={psy.id} value={psy.name}>{psy.name} - {psy.specialty}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <FormMessage>{error}</FormMessage>}
    </FormItem>
  );
};

export default AppointmentPsychologistSelect;
