import React from 'react';
import { Grid } from '@mui/material';
import 'react-day-picker/dist/style.css';
import SummaryBox from './SummaryBox';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import GarageIcon from '@mui/icons-material/Garage';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import '../Styles/styles.css';
import gojekLogo from '../../../../Assets/gojek_no_words_logo.png';
import grabLogo from '../../../../Assets/grab_g_logo.png';
import rydeLogo from '../../../../Assets/ryde_logo.png';
import tadaLogo from '../../../../Assets/tada_logo.webp';

import 'swiper/css/pagination';
import { EarningsLogInfo } from '../../../../Utils/types';

interface SummaryProps {
  logData: EarningsLogInfo[];
}

const Summary = (props: SummaryProps) => {
  const { logData } = props;

  const {
    totalTotalProfit,
    totalTotalRevenue,
    totalPetrolCosts,
    totalDistance,
    totalGrabRevenue,
    totalGojekRevenue,
    totalRydeRevenue,
    totalTadaRevenue,
  } = logData.reduce(
    (a, b) => ({
      totalTotalProfit: a.totalTotalProfit + b.totalProfit,
      totalTotalRevenue: a.totalTotalRevenue + b.totalRevenue,
      totalPetrolCosts: a.totalPetrolCosts + b.petrolCost,
      totalDistance: a.totalDistance + b.distance,
      totalGrabRevenue: a.totalGrabRevenue + b.grabEarnings,
      totalGojekRevenue: a.totalGojekRevenue + b.gojekEarnings,
      totalRydeRevenue: a.totalRydeRevenue + b.rydeEarnings,
      totalTadaRevenue: a.totalTadaRevenue + b.tadaEarnings,
    }),
    {
      totalTotalProfit: 0,
      totalTotalRevenue: 0,
      totalPetrolCosts: 0,
      totalDistance: 0,
      totalGrabRevenue: 0,
      totalGojekRevenue: 0,
      totalTadaRevenue: 0,
      totalRydeRevenue: 0,
    }
  );

  return (
    <Swiper
      pagination={{
        clickable: true,
        type: 'bullets',
      }}
      modules={[Pagination]}
      className="mySwiper"
      spaceBetween={20}
    >
      <SwiperSlide>
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
      </SwiperSlide>
      <SwiperSlide>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <SummaryBox color="#0d2e3e">
              <Grid container direction="row" justifyContent={'space-around'}>
                <Grid item xs={4}>
                  <img
                    src={tadaLogo}
                    width={31}
                    alt={'tada-logo'}
                    style={{
                      borderRadius: 10,
                      background: 'white',
                      paddingTop: 12,
                      paddingBottom: 12,
                      paddingLeft: 2,
                      paddingRight: 2,
                    }}
                  />
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
                      ${Math.round(totalTadaRevenue * 100) / 100}
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
                      Tada Revenue
                    </span>
                  </Grid>
                </Grid>
              </Grid>
            </SummaryBox>
          </Grid>
          <Grid item xs={6}>
            <SummaryBox color="#3daa4b">
              <Grid container direction="row" justifyContent={'space-around'}>
                <Grid item xs={4}>
                  <img
                    src={gojekLogo}
                    alt={'gojek-logo'}
                    width={35}
                    style={{
                      borderRadius: 10,
                      background: 'white',
                    }}
                  />
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
                      ${Math.round(totalGojekRevenue * 100) / 100}
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
                      Gojek Revenue
                    </span>
                  </Grid>
                </Grid>
              </Grid>
            </SummaryBox>
          </Grid>
          <Grid item xs={6}>
            <SummaryBox color="#00B14F">
              <Grid container direction="row" justifyContent={'space-around'}>
                <Grid item xs={4}>
                  <img
                    src={grabLogo}
                    width={25}
                    alt={'grab-logo'}
                    style={{
                      borderRadius: 10,
                      background: 'white',
                      paddingTop: 4,
                      paddingBottom: 4,
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}
                  />
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
                      ${Math.round(totalGrabRevenue * 100) / 100}
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
                      Grab Revenue
                    </span>
                  </Grid>
                </Grid>
              </Grid>
            </SummaryBox>
          </Grid>
          <Grid item xs={6}>
            <SummaryBox color="#e83863">
              <Grid container direction="row" justifyContent={'space-around'}>
                <Grid item xs={4}>
                  <img
                    src={rydeLogo}
                    width={31}
                    alt={'ryde-logo'}
                    style={{
                      borderRadius: 10,
                      background: 'white',
                      paddingTop: 9,
                      paddingBottom: 9,
                      paddingLeft: 2,
                      paddingRight: 2,
                    }}
                  />
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
                      ${Math.round(totalRydeRevenue * 100) / 100}
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
                      Ryde Revenue
                    </span>
                  </Grid>
                </Grid>
              </Grid>
            </SummaryBox>
          </Grid>
        </Grid>
      </SwiperSlide>
    </Swiper>
  );
};

export default Summary;
