
import React from 'react';
import { format, parseISO, addDays } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDateToPPP = (dateString) => {
  if (!dateString) return '';
  return format(parseISO(dateString), 'PPP', { locale: es });
};

export const getAvailableDates = (daysCount = 14) => {
  return Array.from({ length: daysCount }, (_, i) => {
    const date = addDays(new Date(), i + 1);
    if (date.getDay() === 0 || date.getDay() === 6) {
      return null;
    }
    return format(date, 'yyyy-MM-dd');
  }).filter(Boolean);
};

export const defaultAvailableTimes = [
  '09:00', '10:00', '11:00', '12:00',
  '15:00', '16:00', '17:00', '18:00'
];
