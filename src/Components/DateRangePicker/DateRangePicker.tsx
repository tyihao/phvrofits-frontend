import React from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const pastMonth = new Date();

interface DateRangePickerProps {
  dateRange: DateRange | undefined;
  handleDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

export default function DateRangePicker(props: DateRangePickerProps) {
  const { dateRange, handleDateRange } = props;

  return (
    <DayPicker
      mode="range"
      defaultMonth={pastMonth}
      selected={dateRange}
      onSelect={handleDateRange}
    />
  );
}
