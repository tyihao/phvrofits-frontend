import React, { useEffect, useState } from 'react';
import useLogData from '../../../Utils/useLogData';
import {
  DataGrid,
  gridClasses,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
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
import Header from './Components/Header';

import {
  addDays,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  startOfWeek,
  endOfWeek,
  startOfYear,
  endOfYear,
  addYears,
  isSameDay,
} from 'date-fns';

const defineds = {
  startOfWeek: startOfWeek(new Date()),
  endOfWeek: endOfWeek(new Date()),
  startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
  endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
  startOfToday: startOfDay(new Date()),
  endOfToday: endOfDay(new Date()),
  startOfYesterday: startOfDay(addDays(new Date(), -1)),
  endOfYesterday: endOfDay(addDays(new Date(), -1)),
  startOfMonth: startOfMonth(new Date()),
  endOfMonth: endOfMonth(new Date()),
  startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
  endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
  startOfYear: startOfYear(new Date()),
  endOfYear: endOfYear(new Date()),
  startOfLastYear: startOfYear(addYears(new Date(), -1)),
  endOfLastYear: endOfYear(addYears(new Date(), -1)),
};

const defaultRanges = {
  'This week': {
    from: defineds.startOfWeek,
    to: defineds.endOfWeek,
  },
  'Last week': {
    from: defineds.startOfLastWeek,
    to: defineds.endOfLastWeek,
  },
  'This month': {
    from: defineds.startOfMonth,
    to: defineds.endOfMonth,
  },
  'Last month': {
    from: defineds.startOfLastMonth,
    to: defineds.endOfLastMonth,
  },
  'This year': {
    from: defineds.startOfYear,
    to: defineds.endOfYear,
  },
  'Last year': {
    from: defineds.startOfLastYear,
    to: defineds.endOfLastYear,
  },
};

const LogListPage = () => {
  const [gojekEarnings, setGojekEarnings] = useState<string>('');
  const [grabEarnings, setGrabEarnings] = useState<string>('');
  const [tadaEarnings, setTadaEarnings] = useState<string>('');
  const [rydeEarnings, setRydeEarnings] = useState<string>('');
  const [distance, setDistance] = useState<string>('');
  const [hide, setHide] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLog, setSelectedLog] = useState<LogInfo>({} as LogInfo);
  const [dateFilterDialog, setDateFilterDialog] = useState(false);
  const [dateFilter, setDateFilter] = useState<DateRange | undefined>(
    undefined
  );
  const [temporaryDateFilter, setTemporaryDateFilter] = useState<
    DateRange | undefined
  >(undefined);
  const [customDate, setCustomDate] = useState(false);
  const [logData, setLogData] = useState<LogInfo[]>(
    orderBy(useLogData(), ['date'], ['desc'])
  );

  const data = useLogData();
  useEffect(() => setLogData(orderBy(data, ['date'], ['desc'])), [data]);

  const columns: GridColDef[] = [
    {
      field: 'date',
      headerName: 'Date',
    },
    { field: 'distance', headerName: 'Distance (km)', width: 110 },
    { field: 'gojekEarnings', headerName: 'Gojek ($)', hide, width: 80 },
    { field: 'grabEarnings', headerName: 'Grab ($)', hide, width: 80 },
    { field: 'rydeEarnings', headerName: 'Ryde ($)', hide, width: 80 },
    { field: 'tadaEarnings', headerName: 'Tada ($)', hide, width: 80 },
    { field: 'totalRevenue', headerName: 'Revenue ($)', hide, width: 100 },
    { field: 'petrolCost', headerName: 'Cost ($)', hide, width: 80 },
    { field: 'totalProfit', headerName: 'Profit ($)', width: 80 },
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

  const ActionBar = () => {
    return (
      <Grid container direction="row" justifyContent={'space-between'}>
        <Grid item>
          <Button
            startIcon={<CalendarMonthIcon />}
            onClick={() => setDateFilterDialog((state) => !state)}
            sx={{ color: '#2c5491' }}
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
            <>
              <AppBar
                sx={{
                  padding: '10px',
                  position: 'relative',
                  backgroundColor: 'transparent',
                  color: 'black',
                  boxShadow: 0,
                }}
              >
                <Toolbar>
                  {/* <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => {
                      setDateFilterDialog((state) => !state);
                      setTemporaryDateFilter(undefined);
                    }}
                    aria-label="close"
                  >
                    <Fab
                      size="medium"
                      sx={{
                        padding: '8px',
                        backgroundColor: 'white',
                        borderRadius: '15px',
                        boxShadow: `rgba(149, 157, 165, 0.2) 0px 8px 24px`,
                      }}
                    >
                      <CloseIcon />
                    </Fab>
                  </IconButton> */}
                  <Typography
                    sx={{ ml: 2, flex: 1 }}
                    variant="h6"
                    component="div"
                  >
                    Date Filters
                  </Typography>
                  <Button
                    autoFocus
                    color="inherit"
                    onClick={() => {
                      setDateFilter(undefined);
                      setTemporaryDateFilter(undefined);
                    }}
                  >
                    RESET ALl
                  </Button>
                </Toolbar>
              </AppBar>
              <Box style={{ margin: '10px 20px' }}>
                <Stack direction={'column'}>
                  {/* <DateRangeDisplay /> */}
                  <FormControl>
                    <FormLabel id="date-range-form-label">Date Range</FormLabel>
                    <RadioGroup
                      aria-labelledby="date-range-radio-group-label"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="this-week"
                        control={<Radio />}
                        label="This week"
                        onClick={(e) => {
                          setTemporaryDateFilter(defaultRanges['This week']);
                          setCustomDate(false);
                        }}
                      />
                      <FormControlLabel
                        value="last-week"
                        control={<Radio />}
                        label="Last week"
                        onClick={() => {
                          setTemporaryDateFilter(defaultRanges['Last week']);
                          setCustomDate(false);
                        }}
                      />
                      <FormControlLabel
                        value="this-month"
                        control={<Radio />}
                        label="This month"
                        onClick={() => {
                          setTemporaryDateFilter(defaultRanges['This month']);
                          setCustomDate(false);
                        }}
                      />
                      <FormControlLabel
                        value="last-month"
                        control={<Radio />}
                        label="Last month"
                        onClick={() => {
                          setTemporaryDateFilter(defaultRanges['Last month']);
                          setCustomDate(false);
                        }}
                      />
                      <FormControlLabel
                        value="this-year"
                        control={<Radio />}
                        label="This year"
                        onClick={() => {
                          setTemporaryDateFilter(defaultRanges['This year']);
                          setCustomDate(false);
                        }}
                      />
                      <FormControlLabel
                        value="last-year"
                        control={<Radio />}
                        label="Last year"
                        onClick={() => {
                          setTemporaryDateFilter(defaultRanges['Last year']);
                          setCustomDate(false);
                        }}
                      />
                      {/* 
                      <FormControlLabel
                        value="custom-date"
                        control={<Radio onClick={() => setCustomDate(true)} />}
                        label="Custom range"
                        />
                      {customDate && (
                        <>
                          <DateRangeDisplay />
                          <DateRangePicker
                            dateRange={dateFilter}
                            handleDateRange={setDateFilter}
                          />
                        </>
                      )}
                      </>
                    */}
                    </RadioGroup>
                  </FormControl>
                  {/* <Button
                    variant="contained"
                    style={{ margin: '10px 15px' }}
                    onClick={() => setCustomDate((state) => !state)}
                    >
                    Custom: Select Date
                  </Button> */}
                  <Button
                    variant="contained"
                    style={{ margin: '10px 0', backgroundColor: '#2c5491' }}
                    onClick={() => {
                      setDateFilterDialog((state) => !state);
                      setDateFilter(temporaryDateFilter);
                      setTemporaryDateFilter(undefined);
                    }}
                    disabled={!temporaryDateFilter}
                  >
                    Apply Filter
                  </Button>
                  <Button
                    variant="outlined"
                    style={{
                      margin: '10px 0',
                      color: '#2c5491',
                      borderColor: '#2c5491',
                    }}
                    onClick={() => {
                      setDateFilterDialog((state) => !state);
                      setTemporaryDateFilter(undefined);
                    }}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Box>
            </>
          </Dialog>
        </Grid>
        <Grid item>
          <Button
            endIcon={<InfoIcon />}
            onClick={() => setHide((state) => !state)}
            sx={{ color: '#2c5491' }}
          >
            Expand Table
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
      setGojekEarnings(currentLog.gojekEarnings.toString());
      setGrabEarnings(currentLog.grabEarnings.toString());
      setRydeEarnings(currentLog.rydeEarnings.toString());
      setTadaEarnings(currentLog.tadaEarnings.toString());
      setDistance(currentLog.distance.toString());
    } else if (!currentLog && openDialog) {
      // If we are closing the dialog
      setLogData((state) => {
        const updatedData = state.map((mappedLog) => {
          if (mappedLog.id === selectedLog.id) {
            const petrolCost =
              mappedLog.discountedLitrePetrol *
              ((distance !== '' ? parseFloat(distance) : 0) / 100) *
              selectedLog.fuelEfficiency;
            const totalRevenue =
              gojekEarnings !== ''
                ? parseFloat(gojekEarnings)
                : 0 + tadaEarnings !== ''
                ? parseFloat(tadaEarnings)
                : 0 + grabEarnings !== ''
                ? parseFloat(grabEarnings)
                : 0 + rydeEarnings !== ''
                ? parseFloat(rydeEarnings)
                : 0;
            const log = {
              ...selectedLog,
              gojekEarnings:
                gojekEarnings !== '' ? parseFloat(gojekEarnings) : 0,
              grabEarnings: grabEarnings !== '' ? parseFloat(grabEarnings) : 0,
              rydeEarnings: rydeEarnings !== '' ? parseFloat(rydeEarnings) : 0,
              tadaEarnings: tadaEarnings !== '' ? parseFloat(tadaEarnings) : 0,
              distance: distance !== '' ? parseFloat(distance) : 0,
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

  const logDataFiltered = logData.filter((log) => {
    if (dateFilter) {
      if (dateFilter.from && dateFilter.to) {
        return (
          log.date >=
            new Date(new Date(dateFilter.from).setHours(0, 0, 0, 0)) &&
          log.date < new Date(new Date(dateFilter.to).setHours(23, 59, 59, 999))
        );
      }
      if (dateFilter.from) {
        return (
          log.date >= new Date(new Date(dateFilter.from).setHours(0, 0, 0, 0))
        );
      }
      if (dateFilter.to) {
        return (
          log.date < new Date(new Date(dateFilter.to).setHours(23, 59, 59, 999))
        );
      }
    }
    return log;
  });

  const {
    totalTotalRevenue,
    totalTotalProfit,
    totalPetrolCosts,
    totalDistance,
    totalGrabRevenue,
    totalGojekRevenue,
    totalRydeRevenue,
    totalTadaRevenue,
  } = logDataFiltered.reduce(
    (a, b) => ({
      totalTotalProfit: a.totalTotalProfit + b.totalProfit,
      totalTotalRevenue: a.totalTotalRevenue + b.totalRevenue,
      totalPetrolCosts: a.totalPetrolCosts + b.petrolCost,
      totalDistance: a.totalDistance + b.distance,
      totalGrabRevenue: a.totalGrabRevenue + b.grabEarnings,
      totalGojekRevenue: a.totalGojekRevenue + b.gojekEarnings,
      totalRydeRevenue: a.totalRydeRevenue + b.rydeEarnings,
      totalTadaRevenue: a.totalTadaRevenue + b.tadaEarnings,
    }),
    {
      totalTotalProfit: 0,
      totalTotalRevenue: 0,
      totalPetrolCosts: 0,
      totalDistance: 0,
      totalGrabRevenue: 0,
      totalGojekRevenue: 0,
      totalTadaRevenue: 0,
      totalRydeRevenue: 0,
    }
  );

  return (
    <div style={{ margin: '0 20px 20px 20px' }}>
      <ActionBar />
      <Header dateRange={dateFilter} totalResults={logDataFiltered.length} />
      <Summary
        totalDistance={totalDistance}
        totalPetrolCosts={totalPetrolCosts}
        totalTotalProfit={totalTotalProfit}
        totalTotalRevenue={totalTotalRevenue}
        totalGrabRevenue={totalGrabRevenue}
        totalGojekRevenue={totalGojekRevenue}
        totalRydeRevenue={totalRydeRevenue}
        totalTadaRevenue={totalTadaRevenue}
      />
      <DataGrid
        autoHeight
        disableColumnMenu
        getRowClassName={(params) => {
          const rowNum = params.indexRelativeToCurrentPage;
          if (rowNum % 2 === 0) {
            return 'even';
          }
          return 'odd';
        }}
        sx={{
          background: 'white',
          borderRadius: '10px',
          marginTop: '8px',
          border: 0,
          // border: '1px solid rgb(200,200,200)',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
          [`& .${gridClasses.row}.even`]: {
            backgroundColor: 'rgba(44, 84, 145, 0)',
          },
          [`& .MuiDataGrid-columnHeaders`]: {
            backgroundColor: 'rgba(44, 84, 145, 0.2)',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
          },
          // [`& .MuiDataGrid-footerContainer`]: {
          //   backgroundColor: 'rgba(44, 84, 145, 0.5)',
          //   borderRadius: '10px',
          // },
          [`& .${gridClasses.row}.odd`]: {
            backgroundColor: 'rgba(44, 84, 145, 0.1)',
          },
        }}
        rowsPerPageOptions={[10, 25, 50, 100]}
        rows={logDataFiltered.map((log) => ({
          ...log,
          date: log.date.toLocaleDateString(),
          totalProfit: Math.round(log.totalProfit * 100) / 100,
          totalRevenue: Math.round(log.totalRevenue * 100) / 100,
          petrolCost: Math.round(log.petrolCost * 100) / 100,
        }))}
        columns={columns}
        loading={logData.length === 0}
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
    </div>
  );
};

export default LogListPage;
