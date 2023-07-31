import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

interface LoadingBackdropProps {
  isLoading: boolean;
}

const LoadingBackdrop = (props: LoadingBackdropProps) => {
  const { isLoading } = props;
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingBackdrop;
