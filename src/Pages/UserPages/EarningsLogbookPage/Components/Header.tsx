import { Box } from '@mui/material';
import React from 'react';
import { DateRange } from 'react-day-picker';

interface HeaderProps {
  dateRange?: DateRange;
  totalResults: number;
}

const Header = (props: HeaderProps) => {
  const { dateRange, totalResults } = props;
  return (
    <Box
      sx={{
        padding: '4px 7px 4px 14px',
        display: 'flex',
        borderRadius: '15px',
        margin: '3px 0 8px 0',
        boxShadow: 'rgba(100, 100, 111, 0.3) 0px 7px 29px 0px',
        height: '100%',
        background: 'rgba(60, 83, 117, 0.7)',
        fontSize: '14px',
        color: 'white',
      }}
    >
      {dateRange ? (
        <>
          Displaying {totalResults} logs from{' '}
          {dateRange.from && dateRange.from.toLocaleDateString()} to{' '}
          {dateRange.to ? dateRange.to.toLocaleDateString() : 'today'}
        </>
      ) : (
        <> Displaying all {totalResults} logs </>
      )}
    </Box>
  );
};

export default Header;
