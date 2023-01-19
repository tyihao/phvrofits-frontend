import CloseIcon from '@mui/icons-material/Close';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  Grid,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import 'react-day-picker/dist/style.css';
import { editEntryOnFirebase } from '../../../../Firebase';
import { LogInfo } from '../../../../Utils/types';
import Transition from './Transition';

interface EditLogProps {
  handleClose: (currentLog?: LogInfo) => void;
  openDialog: boolean;
  selectedLog: LogInfo;
  confirmEdit: (log: LogInfo) => void;
}

const EditLog = (props: EditLogProps) => {
  const { openDialog, handleClose, confirmEdit, selectedLog } = props;
  const [gojekEarnings, setGojekEarnings] = useState<string>('');
  const [grabEarnings, setGrabEarnings] = useState<string>('');
  const [tadaEarnings, setTadaEarnings] = useState<string>('');
  const [rydeEarnings, setRydeEarnings] = useState<string>('');
  const [distance, setDistance] = useState<string>('');

  useEffect(() => {
    if (Object.keys(selectedLog).length) {
      setGojekEarnings(
        selectedLog.gojekEarnings ? selectedLog.gojekEarnings.toString() : ''
      );
      setGrabEarnings(
        selectedLog.grabEarnings ? selectedLog.grabEarnings.toString() : ''
      );
      setRydeEarnings(
        selectedLog.rydeEarnings ? selectedLog.rydeEarnings.toString() : ''
      );
      setTadaEarnings(
        selectedLog.tadaEarnings ? selectedLog.tadaEarnings.toString() : ''
      );
      setDistance(selectedLog.distance ? selectedLog.distance.toString() : '');
    }
  }, [selectedLog]);

  const handleEditLog = () => {
    const petrolCost =
      selectedLog.discountedLitrePetrol *
      ((distance !== '' ? parseFloat(distance) : 0) / 100) *
      selectedLog.fuelEfficiency;
    const totalRevenue =
      (gojekEarnings !== '' ? parseFloat(gojekEarnings) : 0) +
      (tadaEarnings !== '' ? parseFloat(tadaEarnings) : 0) +
      (grabEarnings !== '' ? parseFloat(grabEarnings) : 0) +
      (rydeEarnings !== '' ? parseFloat(rydeEarnings) : 0);
    const log = {
      ...selectedLog,
      gojekEarnings: gojekEarnings !== '' ? parseFloat(gojekEarnings) : 0,
      grabEarnings: grabEarnings !== '' ? parseFloat(grabEarnings) : 0,
      rydeEarnings: rydeEarnings !== '' ? parseFloat(rydeEarnings) : 0,
      tadaEarnings: tadaEarnings !== '' ? parseFloat(tadaEarnings) : 0,
      distance: distance !== '' ? parseFloat(distance) : 0,
      petrolCost,
      totalProfit: totalRevenue - petrolCost,
      totalRevenue,
    };
    editEntryOnFirebase(log);
    confirmEdit(log);
    handleClose();
  };
  return (
    <Dialog
      fullScreen
      open={openDialog}
      onClose={() => handleClose()}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => handleClose()}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Edit Log
          </Typography>
          <Button autoFocus color="inherit" onClick={() => handleEditLog()}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: '30px 20px 20px 20px' }}>
        <Grid direction="column" spacing={2} container>
          <Grid item>
            <TextField
              label="Date"
              disabled
              value={selectedLog.date}
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              type="number"
              id="gojek-earnings"
              label="Gojek Earnings"
              value={gojekEarnings}
              placeholder={'0'}
              onChange={(e) => setGojekEarnings(e.target.value)}
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
              fullWidth
              type="number"
              value={distance}
              placeholder={'0'}
              onChange={(e) => setDistance(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">km</InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default EditLog;
