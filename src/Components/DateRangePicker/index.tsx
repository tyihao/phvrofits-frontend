import React, { useState } from 'react';
import 'react-day-picker/dist/style.css';
import { addDays, format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';

const pastMonth = new Date();

interface DateRangePickerProps {
  dateRange: DateRange | undefined;
  handleDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

export default function DateRangePicker(props: DateRangePickerProps) {
  const { dateRange, handleDateRange } = props;

  let footer = <p>Please pick the first day.</p>;

  if (dateRange && dateRange.from) {
    if (!dateRange.to) {
      footer = <p>{format(dateRange.from, 'PPP')}</p>;
    } else if (dateRange.to) {
      footer = (
        <p>
          {format(dateRange.from, 'PPP')}–{format(dateRange.to, 'PPP')}
        </p>
      );
    }
  }

  return (
    <DayPicker
      mode="range"
      defaultMonth={pastMonth}
      selected={dateRange}
      footer={footer}
      onSelect={handleDateRange}
    />
  );
}
