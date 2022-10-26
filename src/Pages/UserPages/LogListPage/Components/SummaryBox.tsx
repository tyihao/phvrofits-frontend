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
        padding: '20px 15px',
        display: 'flex',
        borderRadius: '20px',
        margin: '0px 0 0 0',
        background: color,
        color: color ? 'white' : 'black',
        fontFamily: 'sans-serif',
      }}
    >
      {children}
    </Box>
  );
};
export default SummaryBox;
