import { Box } from '@mui/material';
import React from 'react';

const FormHeader = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        margin: '5px 0 10px 0',
        padding: '6px',
        background: 'rgba(145,105,44,0.3)',
        fontFamily: 'sans-serif',
      }}
    >
      <span style={{ fontWeight: 500, fontSize: 24, color: '#292929' }}>
        Log Entry
      </span>
      <br />
      <span style={{ fontWeight: 300, fontSize: 16, color: '#4F4F4F' }}>
        Fill in the form
      </span>
    </Box>
  );
};

export default FormHeader;
