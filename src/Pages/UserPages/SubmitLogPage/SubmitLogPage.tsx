import React from 'react';
import {
  Alert,
  AlertColor,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { submitEarningsLogToFirebase } from '../../../Firebase/firebase';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import './Styles/styles.css';
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import useLogData from '../../../Utils/useLogData';
import './Styles/styles.css';
import gojekLogo from '../../../Assets/gojek_logo.png';
import grabLogo from '../../../Assets/grab_logo.png';
import rydeLogo from '../../../Assets/ryde_logo.png';
import tadaLogo from '../../../Assets/tada_logo.webp';
import LogoBox from './Components/LogoBox';
import { getFormattedDate } from '../../../Utils/generalUtils';

const SubmitLogPage = () => {
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
  const loggedDates = useLogData().reduce((a, b) => {
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

    setGojekEarnings('');
    setRydeEarnings('');
    setGrabEarnings('');
    setTadaEarnings('');
    setDistance('');
  };

  const clearEntry = async () => {
    setGojekEarnings('');
    setRydeEarnings('');
    setGrabEarnings('');
    setTadaEarnings('');
    setDistance('');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div>
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
                       log in Logs.`
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  id="distance"
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
          <Stack>
            <Button
              variant="contained"
              style={{
                margin: '15px 0 0 0',
                height: '50px',
                borderRadius: '10px',
              }}
              onClick={submitEntry}
              disabled={[...loggedDates, ...newlyLoggedDates].includes(
                date.format('DD/MM/YYYY')
              )}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              style={{
                margin: '15px 0 15px 0',
                height: '50px',
                borderRadius: '10px',
              }}
              onClick={clearEntry}
              disabled={[...loggedDates, ...newlyLoggedDates].includes(
                date.format('DD/MM/YYYY')
              )}
            >
              Reset
            </Button>
          </Stack>
        </div>
        {isLoading && (
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        <Snackbar
          open={snackbar}
          autoHideDuration={6000}
          onClose={() => {
            setSnackbar(false);
          }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbar(false)}
            severity={snackbarType}
            sx={{ width: '100%' }}
          >
            {snackbarType === 'success'
              ? 'Log successfully added.'
              : 'Error uploading log. Please try again later or inform system administrator.'}
          </Alert>
        </Snackbar>
      </div>
    </LocalizationProvider>
  );
};

export default SubmitLogPage;
