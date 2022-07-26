import { ThemeProvider } from '@emotion/react';
import HailIcon from '@mui/icons-material/Hail';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  createTheme,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import '../Styles/Navbar.css';
import useUsername from '../Utils/useUsername';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: React.CSSProperties['color'];
    };
  }

  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }

  interface PaletteColor {
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    darker?: string;
  }
  interface ThemeOptions {
    status: {
      danger: React.CSSProperties['color'];
    };
  }
}

const user_pages = [
  { pageName: 'Home', pageLink: '' },
  { pageName: 'Dashboard', pageLink: 'dashboard' },
  { pageName: 'Log List', pageLink: 'loglist' },
  { pageName: 'Submit Log', pageLink: 'submit' },
];

const general_pages = [
  { pageName: 'Home', pageLink: '' },
  { pageName: 'About', pageLink: 'about' },
  { pageName: 'Login', pageLink: 'signin' },
  { pageName: 'Register', pageLink: 'signup' },
];

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

function Navbar() {
  const name = useUsername();
  const [user, loading, error] = useAuthState(auth);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      {!loading && (
        <AppBar position="static" enableColorOnDark color="secondary">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <HailIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                PHVrofits
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {user
                  ? user_pages.map((page) => (
                      <MenuItem
                        key={page.pageName}
                        onClick={handleCloseNavMenu}
                      >
                        <Typography textAlign="center">
                          <Link
                            className="navbar-link-desktop"
                            to={`/${page.pageLink}`}
                          >
                            {page.pageName}
                          </Link>
                        </Typography>
                      </MenuItem>
                    ))
                  : general_pages.map((page) => (
                      <MenuItem
                        key={page.pageName}
                        onClick={handleCloseNavMenu}
                      >
                        <Typography textAlign="center">
                          <Link
                            className="navbar-link-desktop"
                            to={`/${page.pageLink}`}
                          >
                            {page.pageName}
                          </Link>
                        </Typography>
                      </MenuItem>
                    ))}
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {user
                    ? user_pages.map((page) => (
                        <MenuItem
                          key={page.pageName}
                          onClick={handleCloseNavMenu}
                        >
                          <Typography textAlign="center">
                            <Link
                              className="navbar-link"
                              to={`/${page.pageLink}`}
                            >
                              {page.pageName}
                            </Link>
                          </Typography>
                        </MenuItem>
                      ))
                    : general_pages.map((page) => (
                        <MenuItem
                          key={page.pageName}
                          onClick={handleCloseNavMenu}
                        >
                          <Typography textAlign="center">
                            <Link
                              className="navbar-link"
                              to={`/${page.pageLink}`}
                            >
                              {page.pageName}
                            </Link>
                          </Typography>
                        </MenuItem>
                      ))}
                </Menu>
              </Box>
              <HailIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                PHVrofits
              </Typography>
              {user ? (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <Link className="navbar-link" to={`/account`}>
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt={name} src="/static/images/avatar/2.jpg" />
                      </IconButton>
                    </Link>
                  </Tooltip>
                  {/* <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.pageName}
                    onClick={handleCloseUserMenu}
                  > */}
                  {/* <Typography textAlign="center">
                      <Link className="navbar-link" to={`/${setting.pageLink}`}>
                        {setting.pageName}
                      </Link>
                    </Typography> */}
                  {/* </MenuItem>
                ))}
              </Menu> */}
                </Box>
              ) : (
                <Button
                  sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
                  color="inherit"
                  onClick={() => navigate('/signin')}
                >
                  Login
                </Button>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      )}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </ThemeProvider>
  );
}

export default Navbar;

{
  /* <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {!user && (
            <>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/reset">Reset</Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/submit">Submit</Link>
              </li>
              <li>
                <Link to="/account">Account</Link>
              </li>
              <li>
                <Link to="/" onClick={logout}>
                  Sign Out
                </Link>
              </li>
            </>
          )}
        </ul> */
}
