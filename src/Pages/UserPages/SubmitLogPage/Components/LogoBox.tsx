import { Box } from '@mui/material';
import React from 'react';

interface LogoBoxProps {
  children: React.ReactNode;
}

const LogoBox = (props: LogoBoxProps) => {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        border: 1,
        borderColor: '#cbcbcb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px',
        margin: '0 5px 0 0',
        borderRadius: '10px',
      }}
    >
      {props.children}
    </Box>
  );
};

export default LogoBox;
