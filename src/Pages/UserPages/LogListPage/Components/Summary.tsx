import React from 'react';
import { Grid } from '@mui/material';
import 'react-day-picker/dist/style.css';
import SummaryBox from './SummaryBox';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import GarageIcon from '@mui/icons-material/Garage';
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
          <Grid container direction="row" justifyContent={'space-around'}>
            <Grid item xs={3}>
              <PriceCheckIcon fontSize="large" />
            </Grid>
            <Grid container item xs={8} direction="row">
              <Grid item xs={12}>
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: '16px',
                    marginLeft: '5px',
                  }}
                >
                  ${Math.round(totalTotalProfit * 100) / 100}
                </span>
              </Grid>
              <Grid item xs={12}>
                <span
                  style={{
                    fontWeight: 300,
                    fontSize: '12px',
                    marginLeft: '5px',
                  }}
                >
                  Total Profits
                </span>
              </Grid>
            </Grid>
          </Grid>
        </SummaryBox>
      </Grid>
      <Grid item xs={6}>
        <SummaryBox color="#7a5195">
          <Grid container direction="row" justifyContent={'space-around'}>
            <Grid item xs={3}>
              <ReceiptIcon fontSize="large" />
            </Grid>
            <Grid container item xs={8} direction="row">
              <Grid item xs={12}>
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: '16px',
                    marginLeft: '5px',
                  }}
                >
                  ${Math.round(totalTotalRevenue * 100) / 100}
                </span>
              </Grid>
              <Grid item xs={12}>
                <span
                  style={{
                    fontWeight: 300,
                    fontSize: '12px',
                    marginLeft: '5px',
                  }}
                >
                  Total Revenue
                </span>
              </Grid>
            </Grid>
          </Grid>
        </SummaryBox>
      </Grid>
      <Grid item xs={6}>
        <SummaryBox color="#ef5675">
          <Grid container direction="row" justifyContent={'space-around'}>
            <Grid item xs={3}>
              <LocalGasStationIcon fontSize="large" />
            </Grid>
            <Grid container item xs={8} direction="row">
              <Grid item xs={12}>
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: '16px',
                    marginLeft: '5px',
                  }}
                >
                  ${Math.round(totalPetrolCosts * 100) / 100}
                </span>
              </Grid>
              <Grid item xs={12}>
                <span
                  style={{
                    fontWeight: 300,
                    fontSize: '12px',
                    marginLeft: '5px',
                  }}
                >
                  Total Costs
                </span>
              </Grid>
            </Grid>
          </Grid>
        </SummaryBox>
      </Grid>
      <Grid item xs={6}>
        <SummaryBox color="#ffa600">
          <Grid container direction="row" justifyContent={'space-around'}>
            <Grid item xs={3}>
              <GarageIcon fontSize="large" />
            </Grid>
            <Grid container item xs={8} direction="row">
              <Grid item xs={12}>
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: '16px',
                    marginLeft: '5px',
                  }}
                >
                  {Math.round(totalDistance * 100) / 100} km
                </span>
              </Grid>
              <Grid item xs={12}>
                <span
                  style={{
                    fontWeight: 300,
                    fontSize: '12px',
                    marginLeft: '5px',
                  }}
                >
                  Total Distance
                </span>
              </Grid>
            </Grid>
          </Grid>
        </SummaryBox>
      </Grid>
    </Grid>
  );
};

export default Summary;
