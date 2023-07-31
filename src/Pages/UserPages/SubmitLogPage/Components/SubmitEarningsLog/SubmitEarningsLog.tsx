import {
  AlertColor,
  Box,
  Grid,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from 'moment';
import { useState } from 'react';
import gojekLogo from '../../../../../Assets/gojek_logo.png';
import grabLogo from '../../../../../Assets/grab_logo.png';
import rydeLogo from '../../../../../Assets/ryde_logo.png';
import tadaLogo from '../../../../../Assets/tada_logo.webp';
import { submitEarningsLogToFirebase } from '../../../../../Firebase/firebase';
import { getFormattedDate } from '../../../../../Utils/generalUtils';
import useEarningsLogData from '../../../../../Utils/useEarningsLogData';
import LogoBox from '../../Components/LogoBox';
import LoadingBackdrop from '../ReusableComponents/LoadingBackdrop';
import LogFormButtons from '../ReusableComponents/LogFormButtons';
import SubmitConfirmation from '../ReusableComponents/SubmitConfirmation';
import './Styles/styles.css';

const SubmitEarningsLog = () => {
  const [date, setDate] = useState<moment.Moment>(moment());
  const [gojekEarnings, setGojekEarnings] = useState<string>('');
  const [grabEarnings, setGrabEarnings] = useState<string>('');
  const [tadaEarnings, setTadaEarnings] = useState<string>('');
  const [rydeEarnings, setRydeEarnings] = useState<string>('');
  const [distance, setDistance] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<boolean>(false);
  const [snackbarType, setSnackbarType] = useState<AlertColor>('success');
  const [newlyLoggedDates, setNewlyLoggedDates] = useState<string[]>([]);
  const loggedDates = useEarningsLogData().reduce((a, b) => {
    return [...a, getFormattedDate(b.date)];
  }, [] as string[]);

  const submitEntry = async () => {
    setIsLoading(true);
    await submitEarningsLogToFirebase(
      gojekEarnings !== '' ? parseFloat(gojekEarnings) : 0,
      tadaEarnings !== '' ? parseFloat(tadaEarnings) : 0,
      grabEarnings !== '' ? parseFloat(grabEarnings) : 0,
      rydeEarnings !== '' ? parseFloat(rydeEarnings) : 0,
      date,
      distance !== '' ? parseFloat(distance) : 0
    )
      .then((res) => {
        setSnackbar(true);
        if (res) {
          setSnackbarType('success');
          setNewlyLoggedDates((state) => [...state, date.format('DD/MM/YYYY')]);
        } else {
          setSnackbarType('error');
        }
      })
      .finally(() => setIsLoading(false));

    clearEntry();
  };

  const clearEntry = () => {
    setGojekEarnings('');
    setRydeEarnings('');
    setGrabEarnings('');
    setTadaEarnings('');
    setDistance('');
  };

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className="submit-log-form">
        <Box>
          <Grid direction="column" spacing={2} container>
            <Grid item>
              <b
                style={{
                  fontFamily: 'sans-serif',
                  color: '#292929',
                }}
              >
                Section 1: Date and Distance
              </b>
            </Grid>
            <Grid item>
              <DesktopDatePicker
                inputFormat="DD/MM/yyyy"
                disableFuture
                value={date}
                onChange={(date) => date && setDate(date)}
                minDate={moment('2021/06/08')}
                maxDate={moment()}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    fullWidth
                    error={[...loggedDates, ...newlyLoggedDates].includes(
                      date.format('DD/MM/YYYY')
                    )}
                    sx={{
                      '& .MuiInputBase-root.MuiOutlinedInput-root': {
                        borderRadius: '10px',
                      },

                      '& .MuiFormHelperText-root': {
                        backgroundColor: 'transparent',
                      },
                    }}
                    helperText={
                      [...loggedDates, ...newlyLoggedDates].includes(
                        date.format('DD/MM/YYYY')
                      ) &&
                      `Log exists. Choose another date or edit
                         log in Earnings Logbook.`
                    }
                  />
                )}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                id="distance"
                size="small"
                onChange={(e) => setDistance(e.target.value)}
                fullWidth
                type="number"
                value={distance}
                placeholder={'0'}
                className="textfield"
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: '10px',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <>
                      <InputAdornment position="start">km</InputAdornment>
                    </>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <b
                style={{
                  fontFamily: 'sans-serif',
                  color: '#292929',
                }}
              >
                Section 2: Earnings
              </b>
            </Grid>
            <Grid item>
              <Stack direction="row">
                <LogoBox>
                  <img
                    style={{
                      width: '60px',
                      height: 'auto',
                    }}
                    src={gojekLogo}
                    alt="gojek-earnings"
                  />
                </LogoBox>
                <TextField
                  type="number"
                  size="small"
                  id="gojek-earnings"
                  onChange={(e) => setGojekEarnings(e.target.value)}
                  value={gojekEarnings}
                  placeholder={'0'}
                  className="textfield"
                  sx={{
                    '& .MuiInputBase-root': {
                      borderRadius: '10px',
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction="row">
                <LogoBox>
                  <img
                    style={{
                      width: '60px',
                      height: 'auto',
                    }}
                    src={grabLogo}
                    alt="grab-earnings"
                  />
                </LogoBox>
                <TextField
                  type="number"
                  size="small"
                  id="grab-earnings"
                  placeholder={'0'}
                  onChange={(e) => setGrabEarnings(e.target.value)}
                  value={grabEarnings}
                  className="textfield"
                  sx={{
                    '& .MuiInputBase-root': {
                      borderRadius: '10px',
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction="row">
                <LogoBox>
                  <img
                    style={{
                      width: '60px',
                      height: 'auto',
                    }}
                    src={tadaLogo}
                    alt="tada-earnings"
                  />
                </LogoBox>
                <TextField
                  type="number"
                  id="tada-earnings"
                  size="small"
                  placeholder={'0'}
                  onChange={(e) => setTadaEarnings(e.target.value)}
                  value={tadaEarnings}
                  className="textfield"
                  sx={{
                    '& .MuiInputBase-root': {
                      borderRadius: '10px',
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction="row">
                <LogoBox>
                  <img
                    style={{
                      width: '60px',
                      height: 'auto',
                    }}
                    src={rydeLogo}
                    alt="ryde-earnings"
                  />
                </LogoBox>
                <TextField
                  type="number"
                  id="ryde-earnings"
                  size="small"
                  placeholder={'0'}
                  onChange={(e) => setRydeEarnings(e.target.value)}
                  value={rydeEarnings}
                  className="textfield"
                  sx={{
                    '& .MuiInputBase-root': {
                      borderRadius: '10px',
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <LogFormButtons
          isDisabled={[...loggedDates, ...newlyLoggedDates].includes(
            date.format('DD/MM/YYYY')
          )}
          handleSubmit={submitEntry}
          handleClearEntry={clearEntry}
        />
      </div>
      <LoadingBackdrop isLoading={isLoading} />
      <SubmitConfirmation
        isOpen={snackbar}
        handleSnackbar={handleCloseSnackbar}
        snackbarType={snackbarType}
      />
    </LocalizationProvider>
  );
};

export default SubmitEarningsLog;
