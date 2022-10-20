import React, { useEffect, useState } from 'react';
import useLogData from '../../../Utils/useLogData';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment,
  Switch,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { editEntryOnFirebase } from '../../../Firebase/firebase';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { orderBy } from 'lodash';
import { LogInfo } from '../../../Utils/types';
import DateRangePicker from '../../../Components/DateRangePicker';
import { DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import Transition from './Components/Transition';
import { format } from 'date-fns';
import Summary from './Components/Summary';

const LogListPage = () => {
  const [hide, setHide] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLog, setSelectedLog] = useState<LogInfo>({} as LogInfo);
  const [dateFilterDialog, setDateFilterDialog] = useState(false);
  const [dateFilter, setDateFilter] = useState<DateRange | undefined>(
    undefined
  );
  const [customDate, setCustomDate] = useState(false);
  const [logData, setLogData] = useState<LogInfo[]>(
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
    { field: 'totalRevenue', headerName: 'Revenue ($)', hide, width: 100 },
    { field: 'petrolCost', headerName: 'Cost ($)', hide, width: 70 },
    { field: 'totalProfit', headerName: 'Profit ($)', width: 70 },
    {
      field: 'Edit Action',
      headerName: 'Edit',
      width: 50,
      renderCell: (params) => renderDialog(params),
    },
  ];

  const renderDialog = (params: GridRenderCellParams<any, any, any>) => {
    return (
      <EditIcon fontSize="small" onClick={() => handleEditDialog(params.row)} />
    );
  };

  const DateRangeDisplay = () => {
    return (
      <Box component="div" sx={{ display: 'inline' }}>
        <TextField
          sx={{ width: '40%', margin: '15px 10px' }}
          disabled
          value={
            dateFilter && dateFilter.from
              ? format(dateFilter.from, 'dd-MM-yyyy')
              : 'Start Date'
          }
        />
        <TextField
          sx={{ width: '40%', margin: '15px 10px' }}
          disabled
          value={
            dateFilter && dateFilter.to
              ? format(dateFilter.to, 'dd-MM-yyyy')
              : 'End Date'
          }
        />
      </Box>
    );
  };

  const Header = () => {
    return (
      <Grid container direction="row" justifyContent={'space-between'}>
        <Grid item>
          <Button
            startIcon={<CalendarMonthIcon />}
            onClick={() => setDateFilterDialog((state) => !state)}
          >
            Date Filter
          </Button>
          {/* TODO Bug Fix: dialog keeps exiting custom date selection after selecting a date */}
          {/* <DateFilter
            filteredDate={dateFilter}
            handleDateRange={setDateFilter}
            handleFilterDateDialog={setDateFilterDialog}
            open={dateFilterDialog}
          /> */}
          <Dialog
            fullScreen
            open={dateFilterDialog}
            onClose={() => setDateFilterDialog(false)}
            transitionDuration={0}
          >
            {!customDate ? (
              <>
                <AppBar sx={{ position: 'relative' }}>
                  <Toolbar>
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={() => setDateFilterDialog((state) => !state)}
                      aria-label="close"
                    >
                      <CloseIcon />
                    </IconButton>
                    <Typography
                      sx={{ ml: 2, flex: 1 }}
                      variant="h6"
                      component="div"
                    >
                      Set Date Filter
                    </Typography>
                    <Button
                      autoFocus
                      color="inherit"
                      onClick={() => setDateFilter(undefined)}
                    >
                      RESET ALl
                    </Button>
                  </Toolbar>
                </AppBar>
                <DateRangeDisplay />
                <Button
                  variant="contained"
                  style={{ margin: '10px 15px' }}
                  onClick={() => setCustomDate((state) => !state)}
                >
                  Custom: Select Date
                </Button>
                <Button
                  variant="contained"
                  style={{ margin: '10px 15px' }}
                  onClick={() => setDateFilterDialog((state) => !state)}
                >
                  APPLY FILTER
                </Button>
                <Button
                  variant="outlined"
                  style={{ margin: '10px 15px' }}
                  onClick={() => setDateFilterDialog((state) => !state)}
                >
                  CLOSE
                </Button>
              </>
            ) : (
              <>
                <AppBar sx={{ position: 'relative' }}>
                  <Toolbar>
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={() => setCustomDate((state) => !state)}
                      aria-label="close"
                    >
                      <CloseIcon />
                    </IconButton>
                    <Typography
                      sx={{ ml: 2, flex: 1 }}
                      variant="h6"
                      component="div"
                    >
                      Custom Date Range
                    </Typography>
                    <Button
                      autoFocus
                      color="inherit"
                      onClick={() => {
                        setDateFilterDialog((state) => !state);
                        setCustomDate((state) => !state);
                      }}
                    >
                      Save
                    </Button>
                  </Toolbar>
                </AppBar>
                <DateRangeDisplay />
                <DateRangePicker
                  dateRange={dateFilter}
                  handleDateRange={setDateFilter}
                />
              </>
            )}
          </Dialog>
        </Grid>
        <Grid item>
          <Button
            endIcon={<InfoIcon />}
            onClick={() => setHide((state) => !state)}
          >
            Expand
          </Button>
          {/* <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={!hide}
                  onClick={() => setHide((state) => !state)}
                />
              }
              label="Details"
              labelPlacement="start"
            />
          </FormGroup> */}
        </Grid>
      </Grid>
    );
  };

  const handleEditDialog = (currentLog?: LogInfo) => {
    // If we are opening the edit dialog - select a log
    if (!openDialog && currentLog) {
      setSelectedLog(currentLog);
    } else if (!currentLog && openDialog) {
      // If we are closing the dialog
      setLogData((state) => {
        const updatedData = state.map((mappedLog) => {
          if (mappedLog.id === selectedLog.id) {
            const petrolCost =
              mappedLog.discountedLitrePetrol *
              (selectedLog.distance / 100) *
              selectedLog.fuelEfficiency;
            const totalRevenue =
              selectedLog.gojekEarnings +
              selectedLog.grabEarnings +
              selectedLog.rydeEarnings +
              selectedLog.rydeEarnings;
            const log = {
              ...selectedLog,
              petrolCost,
              totalProfit: totalRevenue - petrolCost,
              date: mappedLog.date,
              totalRevenue,
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

  const handleSelectDateRange = (selectedDates: { from: Date; to: Date }) => {
    setDateFilter(selectedDates);
  };

  const {
    totalTotalRevenue,
    totalTotalProfit,
    totalPetrolCosts,
    totalDistance,
  } = logData
    .filter((log) =>
      dateFilter && dateFilter.from && dateFilter.to
        ? log.date >= new Date(dateFilter.from.setHours(0, 0, 0, 0)) &&
          log.date < new Date(dateFilter.to.setHours(23, 59, 59, 999))
        : log.date
    )
    .reduce(
      (a, b) => ({
        totalTotalProfit: a.totalTotalProfit + b.totalProfit,
        totalTotalRevenue: a.totalTotalRevenue + b.totalRevenue,
        totalPetrolCosts: a.totalPetrolCosts + b.petrolCost,
        totalDistance: a.totalDistance + b.distance,
      }),
      {
        totalTotalProfit: 0,
        totalTotalRevenue: 0,
        totalPetrolCosts: 0,
        totalDistance: 0,
      }
    );

  return (
    <div style={{ margin: '20px' }}>
      <h1> Logs </h1>
      <Header />
      <Summary
        totalDistance={totalDistance}
        totalPetrolCosts={totalPetrolCosts}
        totalTotalProfit={totalTotalProfit}
        totalTotalRevenue={totalTotalRevenue}
      />
      <DataGrid
        autoHeight
        style={{
          background: 'white',
          borderRadius: '10px',
          marginTop: '10px',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        }}
        rowsPerPageOptions={[10, 25, 50, 100]}
        componentsProps={{
          footer: {},
        }}
        rows={logData
          .filter((log) =>
            dateFilter && dateFilter.from && dateFilter.to
              ? log.date >= new Date(dateFilter.from.setHours(0, 0, 0, 0)) &&
                log.date < new Date(dateFilter.to.setHours(23, 59, 59, 999))
              : log.date
          )
          .map((log) => ({
            ...log,
            date: log.date.toLocaleDateString(),
            totalProfit: Math.round(log.totalProfit * 100) / 100,
            totalRevenue: Math.round(log.totalRevenue * 100) / 100,
            petrolCost: Math.round(log.petrolCost * 100) / 100,
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
