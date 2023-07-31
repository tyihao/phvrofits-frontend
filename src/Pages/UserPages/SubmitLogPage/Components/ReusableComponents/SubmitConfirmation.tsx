import { Snackbar, Alert, AlertColor } from '@mui/material';
import React from 'react';

interface SubmitConfirmationProps {
  isOpen: boolean;
  handleSnackbar: () => void;
  snackbarType: AlertColor;
}

const SubmitConfirmation = (props: SubmitConfirmationProps) => {
  const { isOpen, handleSnackbar, snackbarType } = props;
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={handleSnackbar}
        severity={snackbarType}
        sx={{ width: '100%' }}
      >
        {snackbarType === 'success'
          ? 'Log successfully added.'
          : 'Error uploading log. Please try again later or inform system administrator.'}
      </Alert>
    </Snackbar>
  );
};

export default SubmitConfirmation;
