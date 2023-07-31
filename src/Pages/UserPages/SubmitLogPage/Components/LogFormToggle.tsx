import { ToggleButtonGroup, ToggleButton, styled, Paper } from '@mui/material';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: '10px',
    },
    '&:first-of-type': {
      borderRadius: '10px',
    },
  },
}));

interface ToggleButtonProps {
  logForm: string;
  handleLogForm: (form: string) => void;
}

const LogFormToggle = (props: ToggleButtonProps) => {
  const { logForm, handleLogForm } = props;

  const handleOnClick = (event: any) => {
    handleLogForm(event.target.value);
  };

  console.log(logForm);

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        border: (theme) => `1px solid ${theme.palette.divider}`,
        flexWrap: 'wrap',
        margin: '5px 20px',
        borderRadius: '10px',
      }}
    >
      <StyledToggleButtonGroup
        value={logForm}
        exclusive
        onChange={handleOnClick}
        aria-label="text alignment"
        sx={{ width: '100%' }}
      >
        <ToggleButton
          value="earnings"
          aria-label="earnings"
          sx={{ width: '50%' }}
        >
          Earnings Log
        </ToggleButton>
        <ToggleButton value="fuel" aria-label="fuel" sx={{ width: '50%' }}>
          Fuel Log
        </ToggleButton>
      </StyledToggleButtonGroup>
    </Paper>
  );
};

export default LogFormToggle;
