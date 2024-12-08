import { format } from 'date-fns';

export const formatDate = (date: string, pattern: string ): string => {
  return format(new Date(date), pattern);
};

export const getCurrentDate = (): string => {
  const today = new Date();
  return format(today, 'yyyy-MM-dd');
};

export const filterByTerm = (data: any, term: string): any => {
  return data.filter((item: any) =>
    Object.values(item).some((value: any) =>
      value.toString().toLowerCase().includes(term.toLowerCase())
    )
  );
};

export const filterByField = <T>(data: T[], field: keyof T, value: any): T[] => {
  return data.filter(item => item[field] === value);
}

export const isEmptyString = (string: string): boolean => {
  return string.trim() === '';
};

export const isEmptyArray = <T>(data: T[]): boolean => {
  return data.length === 0;
}