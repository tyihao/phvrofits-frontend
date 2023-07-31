import { Button, Stack } from '@mui/material';
import React from 'react';
import './Styles/styles.css';

interface LogFormButtonsProps {
  isDisabled: boolean;
  handleSubmit: () => Promise<void>;
  handleClearEntry: () => void;
}

const LogFormButtons = (props: LogFormButtonsProps) => {
  const { isDisabled, handleSubmit, handleClearEntry } = props;
  return (
    <Stack>
      <Button
        variant="contained"
        size="small"
        onClick={handleSubmit}
        disabled={isDisabled}
        sx={{
          margin: '15px 0 10px 0',
          borderRadius: '10px',
          height: '45px',
        }}
      >
        Submit
      </Button>
      <Button
        variant="outlined"
        size="small"
        onClick={handleClearEntry}
        disabled={isDisabled}
        sx={{
          borderRadius: '10px',
        }}
      >
        Reset
      </Button>
    </Stack>
  );
};

export default LogFormButtons;
