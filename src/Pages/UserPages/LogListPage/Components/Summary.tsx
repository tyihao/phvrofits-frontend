import React from 'react';
import { Grid } from '@mui/material';
import 'react-day-picker/dist/style.css';
import SummaryBox from './SummaryBox';

interface SummaryProps {
  totalTotalProfit: number;
  totalTotalRevenue: number;
  totalPetrolCosts: number;
  totalDistance: number;
}

const Summary = (props: SummaryProps) => {
  const {
    totalTotalProfit,
    totalTotalRevenue,
    totalPetrolCosts,
    totalDistance,
  } = props;
  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <SummaryBox color="#003f5c">
          Total profit: ${Math.round(totalTotalProfit * 100) / 100}
        </SummaryBox>
      </Grid>
      <Grid item xs={6}>
        <SummaryBox color="#7a5195">
          Total revenue: ${Math.round(totalTotalRevenue * 100) / 100}
        </SummaryBox>
      </Grid>
      <Grid item xs={6}>
        <SummaryBox color="#ef5675">
          Total costs: ${Math.round(totalPetrolCosts * 100) / 100}
        </SummaryBox>
      </Grid>
      <Grid item xs={6}>
        <SummaryBox color="#ffa600">
          Total distance: {Math.round(totalDistance * 100) / 100}km
        </SummaryBox>
      </Grid>
    </Grid>
  );
};

export default Summary;
