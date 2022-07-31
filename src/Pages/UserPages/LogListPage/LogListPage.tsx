import React, { useState } from 'react';
import useLogData from '../../../Utils/useLogData';
import {
  DataGrid,
  GridColDef,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { Box, Button, Grid } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { orderBy } from 'lodash';

const LogListPage = () => {
  const [hide, setHide] = useState(true);
  const columns: GridColDef[] = [
    { field: 'date', headerName: 'Date' },
    { field: 'distance', headerName: 'Distance (km)', width: 110 },
    { field: 'gojekEarnings', headerName: 'Gojek ($)', hide, width: 80 },
    { field: 'grabEarnings', headerName: 'Grab ($)', hide, width: 70 },
    { field: 'rydeEarnings', headerName: 'Ryde ($)', hide, width: 70 },
    { field: 'tadaEarnings', headerName: 'Tada ($)', hide, width: 70 },
    { field: 'totalEarnings', headerName: 'Total ($)', width: 80 },
  ];

  const logData = orderBy(useLogData(), ['date'], ['desc']);

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
    <div style={{ height: '790px', width: '100%', margin: '20px' }}>
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
