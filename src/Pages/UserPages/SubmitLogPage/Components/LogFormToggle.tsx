import { ToggleButtonGroup, ToggleButton } from '@mui/material';

interface ToggleButtonProps {
  logForm: string;
  handleLogForm: (form: string) => void;
}

const LogFormToggle = (props: ToggleButtonProps) => {
  const { logForm, handleLogForm } = props;

  const handleOnClick = (event: any) => {
    handleLogForm(event.target.value);
  };

  return (
    <ToggleButtonGroup
      value={logForm}
      exclusive
      onChange={handleOnClick}
      aria-label="text alignment"
    >
      <ToggleButton value="earnings" aria-label="earnings">
        Earnings Log
      </ToggleButton>
      <ToggleButton value="fuel" aria-label="fuel">
        Fuel Log
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LogFormToggle;
