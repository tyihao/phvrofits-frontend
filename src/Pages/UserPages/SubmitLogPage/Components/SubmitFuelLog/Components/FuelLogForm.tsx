import {
  Box,
  Grid,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import React from 'react';
import { FuelLogFormType } from '../../../../../../Utils/types';

interface FuelLogFormProps {
  form: FuelLogFormType;
  handleForm: (arg0: FuelLogFormType) => void;
}

const FuelLogForm = (props: FuelLogFormProps) => {
  const { form, handleForm } = props;

  const handleToggleFullTank = (toggle: string) => {
    const isFulltank = 'true' === toggle;
    isFulltank
      ? handleForm({ ...form, isFullTank: isFulltank })
      : handleForm({ ...form, isFullTank: isFulltank, mileage: undefined });
  };

  return (
    <Box>
      <Grid direction="column" spacing={2} container>
        <Grid item>
          <b>Date</b>
        </Grid>
        <Grid item>
          <DesktopDatePicker
            inputFormat="dd/MM/yyyy"
            disableFuture
            value={form.date}
            onChange={(date) => date && handleForm({ ...form, date })}
            // minDate={}
            // maxDate={}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                fullWidth
                error={false}
                sx={{
                  '& .MuiInputBase-root.MuiOutlinedInput-root': {
                    borderRadius: '10px',
                  },

                  '& .MuiFormHelperText-root': {
                    backgroundColor: 'transparent',
                  },
                }}
                helperText={
                  false &&
                  `Log exists. Choose another date or edit
                 log in Earnings Logbook.`
                }
              />
            )}
          />
        </Grid>

        <Grid item>
          <b>Petrol Pumped</b>
        </Grid>
        <Grid item>
          <TextField
            required
            id="petrol"
            size="small"
            onChange={(e) =>
              handleForm({
                ...form,
                petrolPumped: parseFloat(e.target.value) || 0,
              })
            }
            fullWidth
            type="number"
            value={form.petrolPumped || ''}
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
                  <InputAdornment position="start">litre</InputAdornment>
                </>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <b>Total Cost</b>
        </Grid>
        <Grid item>
          <TextField
            required
            id="totalCost"
            size="small"
            onChange={(e) =>
              handleForm({
                ...form,
                totalCost: parseFloat(e.target.value) || 0,
              })
            }
            fullWidth
            type="number"
            value={form.totalCost || ''}
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
                  <InputAdornment position="start">$</InputAdornment>
                </>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <b>Full Tank?</b>
        </Grid>
        <Grid item>
          <ToggleButtonGroup
            value={form.isFullTank}
            sx={{ margin: 'auto', width: '100%' }}
            // TODO fix any type
            onClick={(e: any) => handleToggleFullTank(e.target.value)}
          >
            <ToggleButton value={false}> No </ToggleButton>
            <ToggleButton value={true}> Yes </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        {form.isFullTank && (
          <>
            <Grid item>
              <b>Current Mileage</b>
            </Grid>
            <Grid item>
              <TextField
                required
                id="mileage"
                size="small"
                disabled={!form.isFullTank}
                onChange={(e) =>
                  handleForm({
                    ...form,
                    mileage: parseFloat(e.target.value) || 0,
                  })
                }
                fullWidth
                type="number"
                value={form.mileage || ''}
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
          </>
        )}
      </Grid>
    </Box>
  );
};

export default FuelLogForm;
