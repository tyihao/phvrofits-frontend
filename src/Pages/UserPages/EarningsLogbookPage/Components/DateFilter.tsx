import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import 'react-day-picker/dist/style.css';
import DateRangePicker from '../../../../Components/DateRangePicker';
import { DateRange } from 'react-day-picker';

interface DateFilterProps {
  open: boolean;
  filteredDate: DateRange | undefined;
  handleDateRange: (value: React.SetStateAction<DateRange | undefined>) => void;
  handleFilterDateDialog: (value: React.SetStateAction<boolean>) => void;
}

const DateFilter = (props: DateFilterProps) => {
  const { open, filteredDate, handleDateRange, handleFilterDateDialog } = props;
  const [customDate, setCustomDate] = useState(false);

  console.log(customDate);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => handleFilterDateDialog(false)}
      transitionDuration={0}
      sx={{ margin: '0 10px' }}
    >
      {!customDate ? (
        <>
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => handleFilterDateDialog((state) => !state)}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Set Date Filter
              </Typography>
              <Button
                autoFocus
                color="inherit"
                onClick={() => handleDateRange(undefined)}
              >
                RESET ALl
              </Button>
            </Toolbar>
          </AppBar>
          <Box component="div" sx={{ display: 'inline' }}>
            <TextField
              sx={{ width: '40%', margin: '15px 10px' }}
              disabled
              value={filteredDate ? filteredDate.from : '-'}
            />{' '}
            <TextField
              sx={{ width: '40%', margin: '15px 10px' }}
              disabled
              value={filteredDate ? filteredDate.to : '-'}
            />
          </Box>
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
            onClick={() => handleFilterDateDialog((state) => !state)}
          >
            APPLY FILTER
          </Button>
          <Button
            variant="outlined"
            style={{ margin: '10px 15px' }}
            onClick={() => handleFilterDateDialog((state) => !state)}
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
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Custom Date Range
              </Typography>
              <Button
                autoFocus
                color="inherit"
                onClick={() => handleDateRange(undefined)}
              >
                Save
              </Button>
            </Toolbar>
          </AppBar>
          <DateRangePicker
            dateRange={filteredDate}
            handleDateRange={handleDateRange}
          />
        </>
      )}
    </Dialog>
  );
};

export default DateFilter;
