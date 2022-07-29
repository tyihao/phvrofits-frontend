import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
  db,
  submitEntryToFirebase,
} from '../../../Firebase/firebase';
import { query, collection, getDocs, where } from 'firebase/firestore';
import './Styles/styles.css';

const SubmitLogPage = () => {
  const [gojekEarnings, setGojekEarnings] = useState<string>('');
  const [tadaEarnings, setTadaEarnings] = useState<string>('');
  const [grabEarnings, setGrabEarnings] = useState<string>('');
  const [rydeEarnings, setRydeEarnings] = useState<string>('');
  const [date, setDate] = useState<number>(0);
  const [distance, setDistance] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [user, loading, error] = useAuthState(auth);
  const submitEntry = async () => {
    setIsLoading(true);
    const q1 = query(
      collection(db, 'users'),
      where('uid', '==', user && user.uid)
    );
    const doc = (await getDocs(q1)).docs[0];
    const id = doc.id;
    await submitEntryToFirebase(
      id,
      gojekEarnings !== '' ? parseInt(gojekEarnings) : 0,
      tadaEarnings !== '' ? parseInt(tadaEarnings) : 0,
      grabEarnings !== '' ? parseInt(grabEarnings) : 0,
      rydeEarnings !== '' ? parseInt(rydeEarnings) : 0,
      date,
      distance !== '' ? parseInt(distance) : 0
    ).finally(() => setIsLoading(false));
    setGojekEarnings('');
    setRydeEarnings('');
    setGrabEarnings('');
    setTadaEarnings('');
    setDistance('');
  };

  useEffect(() => {
    const now = new Date();
    const nowTimestamp = now.getTime();
    setDate(nowTimestamp);
  }, []);

  return (
    <div>
      <div className="submit-log-form">
        <h1> Submit Your Log </h1>
        <Box>
          <Grid direction="column" spacing={2} container>
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
    </div>
  );
};

export default SubmitLogPage;
