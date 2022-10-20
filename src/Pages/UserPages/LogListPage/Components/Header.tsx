import { Box } from '@mui/material';
import React from 'react';
import { DateRange } from 'react-day-picker';

interface HeaderProps {
  dateRange?: DateRange;
}

const Header = (props: HeaderProps) => {
  const { dateRange } = props;
  return (
    <Box
      sx={{
        padding: '7px 7px 7px 14px',
        display: 'flex',
        border: '1px solid rgba(224,224,224,1)',
        borderRadius: '15px',
        margin: '5px 0 15px 0',
        boxShadow: 'rgba(100, 100, 111, 0.3) 0px 7px 29px 0px',
        height: '20px',
        background: '#2995F7',
        fontSize: '14px',
        color: 'white',
      }}
    >
      {dateRange ? (
        <>
          Displaying logs from{' '}
          {dateRange.from && dateRange.from.toLocaleDateString()} to
          {dateRange.to ? dateRange.to.toLocaleDateString() : ' today'}
        </>
      ) : (
        <> Displaying all X logs </>
      )}
    </Box>
  );
};

interface Header {
  dateFiltered: boolean;
}

export default Header;
