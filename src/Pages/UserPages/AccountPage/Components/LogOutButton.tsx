import { Button } from '@mui/material';

interface LogOutButtonProps {
  handleLogout: () => void;
}

const LogOutButton = (props: LogOutButtonProps) => {
  const { handleLogout } = props;
  return <Button onClick={handleLogout}> Log Out </Button>;
};

export default LogOutButton;
