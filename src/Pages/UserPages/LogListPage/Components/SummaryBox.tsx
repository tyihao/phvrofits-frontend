import { Box } from '@mui/material';
import React from 'react';

interface SummaryBoxProps {
  children: React.ReactNode;
}
const SummaryBox = (props: SummaryBoxProps) => {
  const { children } = props;
  return (
    <Box
      sx={{
        padding: '20px',
        display: 'flex',
        border: '1px solid rgba(224,224,224,1)',
        borderRadius: '15px',
        margin: '0px 0 5px 0',
        background: 'white',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        height: '60px',
      }}
    >
      {children}
    </Box>
  );
};
export default SummaryBox;
