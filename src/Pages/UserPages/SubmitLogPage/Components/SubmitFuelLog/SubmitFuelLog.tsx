import { AlertColor } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from 'react';
import { submitFuelLogToFirebase } from '../../../../../Firebase';
import { FuelLogFormType } from '../../../../../Utils/types';
import LoadingBackdrop from '../ReusableComponents/LoadingBackdrop';
import LogFormButtons from '../ReusableComponents/LogFormButtons';
import SubmitConfirmation from '../ReusableComponents/SubmitConfirmation';
import FuelLogForm from './Components/FuelLogForm';
import './Styles/styles.css';

const SubmitFuelLog = () => {
  const [form, setForm] = useState<FuelLogFormType>({
    date: new Date(),
    isFullTank: false,
    petrolPumped: 0,
    mileage: undefined,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState<AlertColor>('success');
  // const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    setIsLoading(true);
    await submitFuelLogToFirebase(form)
      .then((res) => {
        setSnackbar(true);
        if (res) {
          setSnackbarType('success');
          handleClearEntry();
        } else {
          setSnackbarType('error');
        }
      })
      .finally(() => setIsLoading(false));
  };
  const handleClearEntry = () => {
    setForm((form) => ({
      ...form,
      isFullTank: false,
      petrolPumped: 0,
      mileage: undefined,
    }));
  };
  const handleSnackbar = () => {
    setSnackbar(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="submit-fuel-log-form">
        <FuelLogForm form={form} handleForm={setForm} />
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
