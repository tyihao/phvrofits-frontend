import { AlertColor } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from 'react';
import { FuelLogFormType } from '../../../../../Utils/types';
import LoadingBackdrop from '../ReusableComponents/LoadingBackdrop';
import LogFormButtons from '../ReusableComponents/LogFormButtons';
import SubmitConfirmation from '../ReusableComponents/SubmitConfirmation';
import FuelLogForm from './Components/FuelLogForm';
import './Styles/styles.css';

const SubmitFuelLog = () => {
  const [form, setForm] = useState<FuelLogFormType>();
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState<AlertColor>('success');

  const handleSubmit = async () => {};
  const handleClearEntry = () => {};
  const handleSnackbar = () => {
    setSnackbar(false);
  };
  const handleSnackbarType = (type: AlertColor) => {
    setSnackbarType(type);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="submit-fuel-log-form">
        <FuelLogForm />
        <LogFormButtons
          isDisabled={false}
          handleSubmit={handleSubmit}
          handleClearEntry={handleClearEntry}
        />
        <LoadingBackdrop isLoading={isLoading} />
        <SubmitConfirmation
          isOpen={snackbar}
          handleSnackbar={handleSnackbar}
          snackbarType={snackbarType}
        />
      </div>
    </LocalizationProvider>
  );
};

export default SubmitFuelLog;
