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
import { Link } from 'react-router-dom';

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
    // returns true if successfully added log, false if not - snackbar message triggered accordingly
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
      .finally(() => {
        setIsLoading(false);
        setSubmitStatus(false);
      });

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

  console.log(newlyLoggedDates);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div>
        <div className="submit-log-form">
          <h1> Submit Your Log </h1>
          <Box>
            <Grid direction="column" spacing={2} container>
              <Grid item>
                <DesktopDatePicker
                  minDate={moment(new Date('June 08, 2021 00:00:00'))}
                  disableFuture
                  label="Date"
                  inputFormat="DD/MM/yyyy"
                  value={date}
                  onChange={(date) => date && setDate(date)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              {[...loggedDates, ...newlyLoggedDates].includes(
                date.format('DD/MM/YYYY')
              ) && (
                <Alert
                  severity="error"
                  className="alert_message"
                  variant="outlined"
                >
                  Date already exists. Please choose another date or delete
                  current entry {<Link to={`/loglist`}> here</Link>}.
                </Alert>
              )}
              <Grid item>
                <TextField
                  type="number"
                  id="gojek-earnings"
                  label="Gojek Earnings"
                  onChange={(e) => setGojekEarnings(e.target.value)}
                  value={gojekEarnings}
                  placeholder={'0'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  type="number"
                  id="grab-earnings"
                  label="Grab Earnings"
                  placeholder={'0'}
                  onChange={(e) => setGrabEarnings(e.target.value)}
                  value={grabEarnings}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  type="number"
                  id="tada-earnings"
                  label="Tada Earnings"
                  placeholder={'0'}
                  onChange={(e) => setTadaEarnings(e.target.value)}
                  value={tadaEarnings}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  type="number"
                  id="ryde-earnings"
                  placeholder={'0'}
                  label="Ryde Earnings"
                  onChange={(e) => setRydeEarnings(e.target.value)}
                  value={rydeEarnings}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  id="distance"
                  label="Distance"
                  onChange={(e) => setDistance(e.target.value)}
                  fullWidth
                  type="number"
                  value={distance}
                  placeholder={'0'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">km</InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Button
            variant="contained"
            style={{
              margin: '15px 0 7px 0',
              color: 'white',
              backgroundColor: '216fb3',
            }}
            onClick={submitEntry}
            disabled={[...loggedDates, ...newlyLoggedDates].includes(
              date.format('DD/MM/YYYY')
            )}
          >
            Submit Entry
          </Button>
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
