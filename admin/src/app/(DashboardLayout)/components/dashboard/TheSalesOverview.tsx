'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Box } from '@mui/material';
import DashboardCard from '../shared/DashboardCard';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const SalesOverview = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  const [chartData, setChartData] = useState({
    categories: [],
    soldSeries: [],
    revenueSeries: [],
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/admin/sales-overview')
        .then(res => res.json())
        .then(data => {
          const categories = data.map((item: any) => item.dayOfWeek);
          const sold = data.map((item: any) => item.soldProducts);
          const revenue = data.map((item: any) => item.revenue);
          setChartData({
            categories,
            soldSeries: sold,
            revenueSeries: revenue,
          });
        });
  }, []);

  const options = {
    chart: {
      type: 'bar',
      height: 315,
      toolbar: { show: false },
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: { columnWidth: '35%' },
    },
    xaxis: {
      categories: chartData.categories,
    },
    yaxis: {
      min: 0,
      tickAmount: 4,
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 5, colors: ['transparent'] },
  };

  const series = [
    { name: 'Sản phẩm bán ra', data: chartData.soldSeries },
    { name: 'Lợi nhuận (triệu ₫)', data: chartData.revenueSeries },
  ];

  return (
      <DashboardCard
          title="Tổng quan doanh số tuần"
          subtitle="So sánh sản phẩm bán ra và lợi nhuận"
          action={
            <Stack spacing={3} mt={5} direction="row" justifyContent="center">
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar sx={{ width: 9, height: 9, bgcolor: primary }} />
                <Typography variant="subtitle2" fontSize="12px" color="primary.main">
                  Sản phẩm bán ra
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar sx={{ width: 9, height: 9, bgcolor: secondary }} />
                <Typography variant="subtitle2" fontSize="12px" color="secondary.main">
                  Lợi nhuận (triệu ₫)
                </Typography>
              </Stack>
            </Stack>
          }
      >
        <Box height="355px">
          <Chart options={options} series={series} type="bar" height={355} width="100%" />
        </Box>
      </DashboardCard>
  );
};

export default SalesOverview;
