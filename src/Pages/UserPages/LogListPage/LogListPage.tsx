import React, { useEffect, useState } from 'react';
import useLogData from '../../../Utils/useLogData';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  Grid,
  InputAdornment,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { auth, db, editEntryOnFirebase } from '../../../Firebase/firebase';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { orderBy } from 'lodash';
import { Log } from '../../../Utils/types';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LogListPage = () => {
  const [hide, setHide] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLog, setSelectedLog] = useState<Log>({} as Log);
  const [logData, setLogData] = useState<Log[]>(
    orderBy(useLogData(), ['date'], ['desc'])
  );

  const data = useLogData();
  useEffect(() => setLogData(orderBy(data, ['date'], ['desc'])), [data]);

  const columns: GridColDef[] = [
    { field: 'date', headerName: 'Date' },
    { field: 'distance', headerName: 'Distance (km)', width: 110 },
    { field: 'gojekEarnings', headerName: 'Gojek ($)', hide, width: 80 },
    { field: 'grabEarnings', headerName: 'Grab ($)', hide, width: 70 },
    { field: 'rydeEarnings', headerName: 'Ryde ($)', hide, width: 70 },
    { field: 'tadaEarnings', headerName: 'Tada ($)', hide, width: 70 },
    { field: 'totalEarnings', headerName: 'Total ($)', width: 80 },
    {
      field: 'Edit Action',
      headerName: '',
      width: 50,
      renderCell: (params) => renderDialog(params),
    },
  ];

  const renderDialog = (params: GridRenderCellParams<any, any, any>) => {
    return (
      <EditIcon fontSize="small" onClick={() => handleEditDialog(params.row)} />
    );
  };

  const Header = () => {
    return (
      <GridToolbarContainer>
        <Grid item>
          <Button
            startIcon={<InfoIcon />}
            onClick={() => setHide((state) => !state)}
          >
            Breakdown
          </Button>
        </Grid>
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
  };

  const handleEditDialog = (currentLog?: Log) => {
    // If we are opening the edit dialog - select a log
    if (!openDialog && currentLog) {
      setSelectedLog(currentLog);
    } else if (!currentLog && openDialog) {
      // If we are closing the dialog
      setLogData((state) => {
        const updatedData = state.map((mappedLog) => {
          if (mappedLog.id === selectedLog.id) {
            const log = {
              ...selectedLog,
              date: mappedLog.date,
              totalEarnings:
                selectedLog.gojekEarnings +
                selectedLog.grabEarnings +
                selectedLog.rydeEarnings +
                selectedLog.rydeEarnings,
            };
            editEntryOnFirebase(log);
            return log;
          } else {
            return mappedLog;
          }
        });
        return updatedData;
      });
    }

    // set dialog from Open to Close or vice-versa
    setOpenDialog((state) => !state);
  };

  const Footer = () => {
    return (
      <Box sx={{ padding: '10px', display: 'flex' }}>Total: {totalTotal}</Box>
    );
  };

  const totalTotal = logData.reduce((a, b) => a + b.totalEarnings, 0);

  return (
    <div style={{ height: '790px', width: '90%', margin: '20px' }}>
      <h1> Logs List </h1>
      <DataGrid
        components={{
          Toolbar: Header,
          //   Footer: Footer,
        }}
        componentsProps={{
          footer: {},
        }}
        rows={logData.map((log) => ({
          ...log,
          date: log.date.toISOString().split('T')[0],
        }))}
        columns={columns}
      />
      <Dialog
        fullScreen
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpenDialog(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit Log
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => handleEditDialog()}
            >
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
                value={selectedLog.gojekEarnings}
                placeholder={'0'}
                onChange={(e) =>
                  setSelectedLog((state) => ({
                    ...state,
                    gojekEarnings: parseFloat(e.target.value),
                  }))
                }
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
                onChange={(e) =>
                  setSelectedLog((state) => ({
                    ...state,
                    grabEarnings: parseFloat(e.target.value),
                  }))
                }
                value={selectedLog.grabEarnings}
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
                onChange={(e) =>
                  setSelectedLog((state) => ({
                    ...state,
                    tadaEarnings: parseFloat(e.target.value),
                  }))
                }
                value={selectedLog.tadaEarnings}
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
                onChange={(e) =>
                  setSelectedLog((state) => ({
                    ...state,
                    rydeEarnings: parseFloat(e.target.value),
                  }))
                }
                value={selectedLog.rydeEarnings}
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
                value={selectedLog.distance}
                placeholder={'0'}
                onChange={(e) =>
                  setSelectedLog((state) => ({
                    ...state,
                    distance: parseFloat(e.target.value),
                  }))
                }
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
    </div>
  );
};

export default LogListPage;
