import { Box } from '@mui/material';
import React from 'react';

interface SummaryBoxProps {
  children: React.ReactNode;
  color?: string;
}
const SummaryBox = (props: SummaryBoxProps) => {
  const { children, color } = props;
  return (
    <Box
      sx={{
        padding: '20px',
        display: 'flex',
        border: '1px solid rgba(224,224,224,1)',
        borderRadius: '20px',
        margin: '0px 0 0 0',
        background: color,
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        color: color ? 'white' : 'black',
        fontFamily: 'sans-serif',
      }}
    >
      {children}
    </Box>
  );
};
export default SummaryBox;
