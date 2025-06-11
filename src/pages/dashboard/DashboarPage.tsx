import { Card, Grid, Stack, Tab, Tabs, Typography, alpha, styled, useTheme } from '@mui/material';
import PageContainer from '../../components/PageContainer';
import { useState } from 'react';
import { TabContext, TabPanel } from '@mui/lab';
import Chart, { useChart } from '../../components/chart';
import { fNumber } from '../../utils/format-number';

const AntTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: 'transparent'
  }
});

const AntTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0
  },
  fontWeight: theme.typography.fontWeightRegular,
  color: theme.palette.text.secondary,
  height: '10px important',
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
    borderRadius: 7,
    opacity: 1
  },
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
    borderRadius: 7
  },
  '&.Mui-focusVisible': {
    color: theme.palette.text.secondary
  }
}));

interface StyledTabProps {
  label: string | number;
  value: string;
}

const charts = {
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
};

export default function DashboarPage() {
  const theme = useTheme();
  const [value, setValue] = useState('1');
  const [valueChart, setValueChart] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleChangeChart = (event: React.SyntheticEvent, newValue: string) => {
    setValueChart(newValue);
  };

  const chartOptions = useChart({
    colors: [theme.palette.secondary.main, theme.palette.info.main],
    xaxis: {
      categories: charts.categories
    }
  });

  const chartSeries = series.map((i) => i.value);

  const chartOptions1 = useChart({
    chart: {
      sparkline: {
        enabled: false
      }
    },
    colors: ['#8062CF', '#EE7641', '#62D1D3'],
    labels: series.map((i) => i.label),
    stroke: {
      colors: [theme.palette.background.paper]
    },
    legend: {
      floating: false,
      position: 'right',
      horizontalAlign: 'right'
    },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false
      }
    },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (value: number) => fNumber(value),
        title: {
          formatter: (seriesName: string) => `${seriesName}`
        }
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false
          }
        }
      }
    }
  });

  return (
    <PageContainer>
      <Grid container spacing={2}>
        {/* <Grid item md={6} xs={6}>
          <Card sx={{ p: 1 }}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography variant="body1">Stats_01</Typography>
              <AntTabs value={value} onChange={handleChange} aria-label="lab API tabs">
                <AntTab sx={{ px: 1 }} label="Semaine" value="1" />
                <AntTab sx={{ px: 1 }} label="Mois" value="2" />
                <AntTab sx={{ px: 1 }} label="Année" value="3" />
              </AntTabs>
            </Stack>
            <TabContext value={value}>
              <TabPanel value="1">
                <Chart
                  dir="ltr"
                  type="line"
                  series={[
                    {
                      name: 'Donnée1',
                      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49]
                    },
                    {
                      name: 'Donnée2',
                      data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77]
                    }
                  ]}
                  options={chartOptions}
                  height={350}
                />
              </TabPanel>
              <TabPanel value="2">
                <Chart
                  dir="ltr"
                  type="line"
                  series={[
                    {
                      name: 'Donnée1',
                      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49]
                    },
                    {
                      name: 'Donnée2',
                      data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77]
                    }
                  ]}
                  options={chartOptions}
                  height={350}
                />
              </TabPanel>
              <TabPanel value="3">
                <Chart
                  dir="ltr"
                  type="line"
                  series={[
                    {
                      name: 'Donnée1',
                      data: [10, 41, 35, 51, 49, 2, 69, 91, 148, 35, 51, 49]
                    },
                    {
                      name: 'Donnée2',
                      data: [10, 34, 13, 56, 77, 88, 99, 7, 45, 13, 56, 77]
                    }
                  ]}
                  options={chartOptions}
                  height={350}
                />
              </TabPanel>
            </TabContext>
          </Card>
        </Grid> */}

        {/* <Grid item md={6} xs={6}>
          <Card sx={{ p: 1 }}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography variant="body1">Stats_02</Typography>
              <AntTabs value={valueChart} onChange={handleChangeChart} aria-label="lab API tabs">
                <AntTab sx={{ px: 1 }} label="Semaine" value="1" />
                <AntTab sx={{ px: 1 }} label="Mois" value="2" />
                <AntTab sx={{ px: 1 }} label="Année" value="3" />
              </AntTabs>
            </Stack>
            <TabContext value={valueChart}>
              <TabPanel value="1">
                <StyledChart
                  dir="ltr"
                  type="pie"
                  series={chartSeries}
                  options={chartOptions1}
                  height={280}
                />
              </TabPanel>
              <TabPanel value="2">
                <StyledChart
                  dir="ltr"
                  type="pie"
                  series={chartSeries}
                  options={chartOptions1}
                  height={280}
                />
              </TabPanel>
              <TabPanel value="3">
                <StyledChart
                  dir="ltr"
                  type="pie"
                  series={chartSeries}
                  options={chartOptions1}
                  height={250}
                />
              </TabPanel>
            </TabContext>
          </Card>
        </Grid> */}
      </Grid>
    </PageContainer>
  );
}

const series = [
  { label: 'Donnée1', value: 4344 },
  { label: 'Donnée2', value: 5435 },
  { label: 'Donnée3', value: 1443 }
];

const CHART_HEIGHT = 360;

const LEGEND_HEIGHT = 80;

const StyledChart = styled(Chart)(({ theme }) => ({
  height: CHART_HEIGHT,
  '& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject': {
    height: `100% !important`
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    width: 150,
    top: `calc(${CHART_HEIGHT - 250}px) !important`
  }
}));
