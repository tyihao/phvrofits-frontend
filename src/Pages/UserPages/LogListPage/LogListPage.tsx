import React, { useState } from 'react';
import useLogData from '../../../Utils/useLogData';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { Box, Button, Grid, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import { orderBy } from 'lodash';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const LogListPage = () => {
  const [hide, setHide] = useState(true);
  const [openDialog, setOpenDialog] = useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const columns: GridColDef[] = [
    { field: 'date', headerName: 'Date' },
    { field: 'distance', headerName: 'Distance (km)', width: 110 },
    { field: 'gojekEarnings', headerName: 'Gojek ($)', hide, width: 80 },
    { field: 'grabEarnings', headerName: 'Grab ($)', hide, width: 70 },
    { field: 'rydeEarnings', headerName: 'Ryde ($)', hide, width: 70 },
    { field: 'tadaEarnings', headerName: 'Tada ($)', hide, width: 70 },
    { field: 'totalEarnings', headerName: 'Total ($)', width: 80 },
    {
      field: 'actions',
      headerName: '',
      width: 50,
      renderCell: (params) => renderDialog(params),
    },
  ];

  const renderDialog = (params: GridRenderCellParams<any, any, any>) => {
    return <EditIcon fontSize="small" onClick={() => setOpenDialog(true)} />;
  };

  const logData = orderBy(useLogData(), ['date'], ['desc']);
  console.log(logData);

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
          // grabEarnings: `$${log.grabEarnings}`,
          // rydeEarnings: `$${log.rydeEarnings}`,
          // tadaEarnings: `$${log.tadaEarnings}`,
          // gojekEarnings: `$${log.gojekEarnings}`,
          // totalEarnings: `$${log.totalEarnings}`,
          // distance: `${log.distance} km`,
        }))}
        columns={columns}
      />
    </div>
  );
};

export default LogListPage;
