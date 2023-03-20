import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  DataGrid,
  gridClasses,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { format } from 'date-fns';
import { orderBy } from 'lodash';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { LogInfo } from '../../../Utils/types';
import useLogData from '../../../Utils/useLogData';
import Header from './Components/Header';
import Summary from './Components/Summary';

import {
  addDays,
  addMonths,
  addYears,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns';

import EditLog from './Components/EditLog';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers';

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

// TODO add Last 7/30/365 days
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
                    variant="outlined"
                    color="inherit"
                    onClick={() => {
                      setDateFilter(undefined);
                      setTemporaryDateFilter(undefined);
                      setCustomDate(false);
                    }}
                  >
                    RESET FILTER
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
                      value={
                        (customDate && 'custom-range') || temporaryDateFilter
                      }
                    >
                      <FormControlLabel
                        value={defaultRanges['This week']}
                        control={<Radio />}
                        label="This week"
                        onClick={(e) => {
                          setTemporaryDateFilter(defaultRanges['This week']);
                          setCustomDate(false);
                        }}
                      />
                      <FormControlLabel
                        value={defaultRanges['Last week']}
                        control={<Radio />}
                        label="Last week"
                        onClick={() => {
                          setTemporaryDateFilter(defaultRanges['Last week']);
                          setCustomDate(false);
                        }}
                      />
                      <FormControlLabel
                        value={defaultRanges['This month']}
                        control={<Radio />}
                        label="This month"
                        onClick={() => {
                          setTemporaryDateFilter(defaultRanges['This month']);
                          setCustomDate(false);
                        }}
                      />
                      <FormControlLabel
                        value={defaultRanges['Last month']}
                        control={<Radio />}
                        label="Last month"
                        onClick={() => {
                          setTemporaryDateFilter(defaultRanges['Last month']);
                          setCustomDate(false);
                        }}
                      />
                      <FormControlLabel
                        value={defaultRanges['This year']}
                        control={<Radio />}
                        label="This year"
                        onClick={() => {
                          setTemporaryDateFilter(defaultRanges['This year']);
                          setCustomDate(false);
                        }}
                      />
                      <FormControlLabel
                        value={defaultRanges['Last year']}
                        control={<Radio />}
                        label="Last year"
                        onClick={() => {
                          setTemporaryDateFilter(defaultRanges['Last year']);
                          setCustomDate(false);
                        }}
                      />

                      <FormControlLabel
                        value="custom-range"
                        control={
                          <Radio
                            onClick={() => {
                              setCustomDate(true);
                            }}
                          />
                        }
                        label="Custom range"
                      />
                      {customDate && (
                        <>
                          <Box
                            sx={{
                              padding: '15px',
                              border: '1px #CCCCCC solid',
                              borderRadius: '15px',
                              margin: '10px 0',
                              backgroundColor: '#ccdbf0',
                            }}
                          >
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                              <Typography
                                fontWeight={500}
                                sx={{ marginBottom: '3px' }}
                              >
                                From
                              </Typography>
                              <DesktopDatePicker
                                inputFormat="DD/MM/yyyy"
                                disableFuture
                                views={['year', 'month', 'day']}
                                onChange={(value) =>
                                  setTemporaryDateFilter((state) => ({
                                    from: value ? new Date(value) : undefined,
                                    to: state?.to,
                                  }))
                                }
                                value={temporaryDateFilter?.from}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    fullWidth
                                    sx={{
                                      '& .MuiInputBase-root.MuiOutlinedInput-root':
                                        {
                                          backgroundColor: 'white',
                                          borderRadius: '10px',
                                        },

                                      '& .MuiFormHelperText-root': {
                                        backgroundColor: 'transparent',
                                      },
                                    }}
                                  />
                                )}
                              />
                              <Typography
                                sx={{ marginTop: '5px', marginBottom: '3px' }}
                                fontWeight={500}
                              >
                                To
                              </Typography>
                              <DesktopDatePicker
                                inputFormat="DD/MM/yyyy"
                                disableFuture
                                views={['year', 'month', 'day']}
                                onChange={(value) =>
                                  setTemporaryDateFilter((state) => ({
                                    from: state?.from,
                                    to: value ? new Date(value) : undefined,
                                  }))
                                }
                                value={temporaryDateFilter?.to}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    fullWidth
                                    sx={{
                                      '& .MuiInputBase-root.MuiOutlinedInput-root':
                                        {
                                          backgroundColor: 'white',
                                          borderRadius: '10px',
                                        },

                                      '& .MuiFormHelperText-root': {
                                        backgroundColor: 'transparent',
                                      },
                                    }}
                                  />
                                )}
                              />
                            </LocalizationProvider>
                          </Box>
                        </>
                      )}
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
            {hide ? 'Expand' : 'Collapse'} Table
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
    }
    // set dialog from Open to Close or vice-versa
    setOpenDialog((state) => !state);
  };

  const confirmEditLog = (editedLog: LogInfo) => {
    setLogData((state) => {
      const updatedData = state.map((log) =>
        log.id === editedLog.id ? { ...editedLog, date: log.date } : log
      );
      return updatedData;
    });
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

  console.log(temporaryDateFilter);

  return (
    <div style={{ margin: '0 20px 20px 20px' }}>
      <ActionBar />
      <Header dateRange={dateFilter} totalResults={logDataFiltered.length} />
      <Summary logData={logDataFiltered} />
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
      <EditLog
        handleClose={handleEditDialog}
        confirmEdit={confirmEditLog}
        openDialog={openDialog}
        selectedLog={selectedLog}
      />
    </div>
  );
};

export default LogListPage;
