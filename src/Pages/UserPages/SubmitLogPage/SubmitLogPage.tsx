import { Box, Button, TextField } from '@mui/material';
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

const SubmitLogPage = () => {
  const [gojekEarnings, setGojekEarnings] = useState<number>(0);
  const [tadaEarnings, setTadaEarnings] = useState<number>(0);
  const [grabEarnings, setGrabEarnings] = useState<number>(0);
  const [date, setDate] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);

  const [user, loading, error] = useAuthState(auth);

  const submitEntry = async () => {
    const q1 = query(
      collection(db, 'users'),
      where('uid', '==', user && user.uid)
    );
    const doc = (await getDocs(q1)).docs[0];
    const id = doc.id;
    console.log(date);
    submitEntryToFirebase(
      id,
      gojekEarnings,
      tadaEarnings,
      grabEarnings,
      date,
      distance
    );
  };

  useEffect(() => {
    const now = new Date();
    const nowTimestamp = now.getTime();
    setDate(nowTimestamp);
  }, []);

  return (
    <div>
      <Box>
        <TextField
          required
          id="outlined-required"
          label="Gojek Earnings"
          onChange={(e) => setGojekEarnings(parseInt(e.target.value))}
        />
        <TextField
          required
          id="outlined-required"
          label="Grab Earnings"
          onChange={(e) => setGrabEarnings(parseInt(e.target.value))}
        />
        <TextField
          required
          id="outlined-required"
          label="Tada Earnings"
          onChange={(e) => setTadaEarnings(parseInt(e.target.value))}
        />
        <TextField
          required
          id="outlined-required"
          label="Distance"
          onChange={(e) => setDistance(parseInt(e.target.value))}
        />
      </Box>
      <Button
        variant="outlined"
        className="register__btn register__google"
        onClick={submitEntry}
      >
        Submit Entry
      </Button>
    </div>
  );
};

export default SubmitLogPage;
