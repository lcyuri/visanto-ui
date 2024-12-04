import { format } from 'date-fns';

export const formatDate = (date: string, pattern: string ): string => {
  return format(new Date(date), pattern);
};

export const getCurrentDate = (): string => {
  const today = new Date();
  return format(today, 'yyyy-MM-dd');
};