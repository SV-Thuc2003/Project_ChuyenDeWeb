import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import {
    IconCurrencyDong,
    IconDeviceWatch,
    IconUsers,
    IconPackage,
} from "@tabler/icons-react";

const DashboardSummary = () => {
    const [data, setData] = useState({
        todayRevenue: "0 triệu ₫",
        totalSoldProducts: "0 sản phẩm",
        newCustomersToday: 0,
        processingOrders: 0,
    });

    useEffect(() => {
        fetch("http://localhost:8080/api/admin/summary")
            .then((res) => res.json())
            .then((res) => setData(res))
            .catch((err) => console.error("Lỗi khi load dữ liệu tổng quan:", err));
    }, []);

    const summaryData = [
        {
            id: 1,
            title: "Doanh thu hôm nay",
            value: data.todayRevenue,
            icon: <IconCurrencyDong size={32} color="#1976d2" />,
            color: "#1976d2",
        },
        {
            id: 2,
            title: "Sản phẩm đã bán",
            value: data.totalSoldProducts,
            icon: <IconDeviceWatch size={32} color="#2e7d32" />,
            color: "#2e7d2",
        },
        {
            id: 3,
            title: "Khách hàng mới",
            value: `${data.newCustomersToday} người`,
            icon: <IconUsers size={32} color="#ed6c02" />,
            color: "#ed6c02",
        },
        {
            id: 4,
            title: "Đơn hàng đang xử lý",
            value: `${data.processingOrders} đơn`,
            icon: <IconPackage size={32} color="#d32f2f" />,
            color: "#d32f2f",
        },
    ];

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 3,
                bgcolor: "#fff",
            }}
        >
            {summaryData.map(({ id, title, value, icon, color }) => (
                <Box
                    key={id}
                    sx={{
                        flex: "1 1 22%",
                        minWidth: 160,
                        p: 2,
                        borderRadius: 3,
                        bgcolor: "#f5f5f5",
                        textAlign: "center",
                        cursor: "default",
                        boxShadow: "none",
                        transition: "none",
                        "&:hover": {
                            transform: "none",
                            boxShadow: "none",
                        },
                    }}
                >
                    <Stack spacing={1} alignItems="center" justifyContent="center">
                        <Box>{icon}</Box>
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            color={color}
                            letterSpacing={1}
                        >
                            {value}
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            fontWeight={600}
                        >
                            {title}
                        </Typography>
                    </Stack>
                </Box>
            ))}
        </Paper>
    );
};

export default DashboardSummary;
