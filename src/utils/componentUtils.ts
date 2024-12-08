import { SelectOption } from '../models/component';

export const handleDataForSelect = (data: any, labelName: string, valueName: string, removeDuplicated?: boolean): SelectOption[] => {
  if (removeDuplicated) {
    const uniqueData = data.filter(
      (item: any, index: number, self: any) =>
        index === self.findIndex((t: any) => t[valueName] === item[valueName])
    );

    return uniqueData.map((item: any) => ({
      label: item[labelName],
      value: item[valueName],
    }));
  } else {
    return data.map((item: any) => ({
      label: item[labelName],
      value: item[valueName],
    }));
  }
};
