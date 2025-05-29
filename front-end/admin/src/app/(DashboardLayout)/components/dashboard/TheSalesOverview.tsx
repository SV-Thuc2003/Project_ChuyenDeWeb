import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Stack, Typography, Avatar, Box } from "@mui/material";
import DashboardCard from "../shared/DashboardCard";

const SalesOverview = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  const optionscolumnchart: any = {
    chart: {
      type: "bar",
      height: 315,
      offsetX: -15,
      toolbar: { show: false },
      foreColor: "#adb0bb",
      fontFamily: "inherit",
      sparkline: { enabled: false },
    },
    colors: [primary, secondary],
    fill: { type: "solid", opacity: 1 },
    plotOptions: {
      bar: { horizontal: false, columnWidth: "35%", borderRadius: 0 },
    },
    grid: {
      show: false,
      borderColor: "transparent",
      padding: { left: 0, right: 0, bottom: 0 },
    },
    dataLabels: { enabled: false },
    markers: { size: 0 },
    legend: { show: false },
    xaxis: {
      type: "category",
      categories: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"],
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      show: true,
      min: 100,
      max: 400,
      tickAmount: 3,
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
  };

  // Dữ liệu gồm 2 series: số lượng bán ra và lợi nhuận
  const seriescolumnchart = [
    { name: "Số sản phẩm bán ra", data: [355, 390, 300, 350, 390, 180, 250] },
    { name: "Lợi nhuận (triệu ₫)", data: [120, 150, 130, 140, 160, 90, 100] },
  ];

  return (
      <DashboardCard
          title="Tổng quan doanh số tuần"
          subtitle="So sánh sản phẩm bán ra và lợi nhuận"
          action={
            <Stack spacing={3} mt={5} direction="row" justifyContent="center">
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                    sx={{
                      width: 9,
                      height: 9,
                      bgcolor: primary,
                      svg: { display: "none" },
                    }}
                />
                <Typography variant="subtitle2" fontSize="12px" color="primary.main">
                  Sản phẩm bán ra
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                    sx={{
                      width: 9,
                      height: 9,
                      bgcolor: secondary,
                      svg: { display: "none" },
                    }}
                />
                <Typography variant="subtitle2" fontSize="12px" color="secondary.main">
                  Lợi nhuận (triệu ₫)
                </Typography>
              </Stack>
            </Stack>
          }
      >
        <Box height="355px">
          <Chart
              options={optionscolumnchart}
              series={seriescolumnchart}
              type="bar"
              height={355}
              width={"100%"}
          />
        </Box>
      </DashboardCard>
  );
};

export default SalesOverview;
