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
import { useEffect, useState } from 'react';
import { submitEntryToFirebase } from '../../../Firebase/firebase';
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

const SubmitLogPage = () => {
  const [gojekEarnings, setGojekEarnings] = useState<string>('');
  const [tadaEarnings, setTadaEarnings] = useState<string>('');
  const [grabEarnings, setGrabEarnings] = useState<string>('');
  const [rydeEarnings, setRydeEarnings] = useState<string>('');
  const [date, setDate] = useState<moment.Moment>(moment());
  const [distance, setDistance] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<boolean>(false);
  const [snackbarType, setSnackbarType] = useState<AlertColor>('success');
  const [newlyLoggedDates, setNewlyLoggedDates] = useState<string[]>([]);
  const [submitStatus, setSubmitStatus] = useState<boolean>(false);
  const loggedDates = useLogData().reduce((a, b) => {
    return [...a, getFormattedDate(b.date)];
  }, [] as string[]);

  const submitEntry = async () => {
    setIsLoading(true);
    await submitEntryToFirebase(
      gojekEarnings !== '' ? parseFloat(gojekEarnings) : 0,
      tadaEarnings !== '' ? parseFloat(tadaEarnings) : 0,
      grabEarnings !== '' ? parseFloat(grabEarnings) : 0,
      rydeEarnings !== '' ? parseFloat(rydeEarnings) : 0,
      date,
      distance !== '' ? parseFloat(distance) : 0
    )
      .then((res) => {
        setSnackbar(true);
        setSubmitStatus(res);
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

  useEffect(() => {
    if (submitStatus) {
      setSnackbarType('success');
      setNewlyLoggedDates((state) => [...state, date.format('DD/MM/YYYY')]);
    } else {
      setSnackbarType('error');
    }
  }, [submitStatus]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div>
        <div className="submit-log-form">
          <Box
            sx={{
              borderRadius: '10px',
              textAlign: 'center',
              margin: '0 0 20px 0',
              padding: '13px',
              background: 'rgba(145,105,44,0.5)',
              fontFamily: 'sans-serif',
              border: '1px solid rgba(145,105,44,0.8)',
              // boxShadow: 'rgba(149, 157, 165, 0.5) 0px 8px 24px',
            }}
          >
            <span style={{ fontWeight: 500, fontSize: 24, color: '#292929' }}>
              DAILY LOG
            </span>
            <br />
            <span style={{ fontWeight: 300, fontSize: 16, color: '#4F4F4F' }}>
              Fill in the form
            </span>
          </Box>
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
                  value={date}
                  onChange={(date) => date && setDate(date)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={[...loggedDates, ...newlyLoggedDates].includes(
                        date.format('DD/MM/YYYY')
                      )}
                      sx={{
                        '& .MuiInputBase-root': {
                          backgroundColor: 'white',
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
                        `Date exists. Please choose another date or edit
                      current entry in Log List.`
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
                    />{' '}
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
                color: 'white',
                backgroundColor: '#2c5491',
                height: '50px',
                borderRadius: '10px',
              }}
              onClick={submitEntry}
              disabled={[...loggedDates, ...newlyLoggedDates].includes(
                date.format('DD/MM/YYYY')
              )}
            >
              Confirm
            </Button>
            <Button
              variant="outlined"
              style={{
                margin: '15px 0 15px 0',
                color: '#2c5491',
                borderColor: '#2c5491',
                height: '50px',
                borderRadius: '10px',
                backgroundColor: 'white',
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
          onClose={() => setSnackbar(false)}
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

const getFormattedDate = (date: Date) => {
  const yyyy = date.getFullYear();
  let mm = (date.getMonth() + 1) as unknown as string; // Months start at 0!
  let dd = date.getDate() as unknown as string;

  if (dd < '10') dd = '0' + dd;
  if (mm < '10') mm = '0' + mm;

  const formattedDate = dd + '/' + mm + '/' + yyyy;
  return formattedDate;
};
