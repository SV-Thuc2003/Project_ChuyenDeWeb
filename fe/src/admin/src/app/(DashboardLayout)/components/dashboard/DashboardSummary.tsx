import React from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import {
    IconCurrencyDong,
    IconDeviceWatch,
    IconUsers,
    IconPackage,
} from "@tabler/icons-react";

const summaryData = [
    {
        id: 1,
        title: "Doanh thu hôm nay",
        value: "150 triệu ₫",
        icon: <IconCurrencyDong size={32} color="#1976d2" />,
        color: "#1976d2",
    },
    {
        id: 2,
        title: "Sản phẩm đã bán",
        value: "320 máy",
        icon: <IconDeviceWatch size={32} color="#2e7d32" />,
        color: "#2e7d32",
    },
    {
        id: 3,
        title: "Khách hàng mới",
        value: "45 người",
        icon: <IconUsers size={32} color="#ed6c02" />,
        color: "#ed6c02",
    },
    {
        id: 4,
        title: "Đơn hàng đang xử lý",
        value: "23 đơn",
        icon: <IconPackage size={32} color="#d32f2f" />,
        color: "#d32f2f",
    },
];

const DashboardSummary = () => {
    return (
        <Paper
            elevation={0}  // tắt đổ bóng ở Paper
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
                        <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                            {title}
                        </Typography>
                    </Stack>
                </Box>
            ))}
        </Paper>
    );
};

export default DashboardSummary;
