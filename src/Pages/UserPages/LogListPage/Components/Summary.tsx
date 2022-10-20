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
        <SummaryBox>
          Total profit: ${Math.round(totalTotalProfit * 100) / 100} <br />
        </SummaryBox>
      </Grid>
      <Grid item xs={6}>
        <SummaryBox>
          Total revenue: ${Math.round(totalTotalRevenue * 100) / 100} <br />
        </SummaryBox>
      </Grid>
      <Grid item xs={6}>
        <SummaryBox>
          Total costs: ${Math.round(totalPetrolCosts * 100) / 100} <br />
        </SummaryBox>
      </Grid>
      <Grid item xs={6}>
        <SummaryBox>
          Total distance: {Math.round(totalDistance * 100) / 100}km <br />
        </SummaryBox>
      </Grid>
    </Grid>
  );
};

export default Summary;
