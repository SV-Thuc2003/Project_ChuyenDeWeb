'use client';
import React from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

const Footer = () => {
    return (
        <Box sx={{ pt: 6, textAlign: "center" }}>
            <Typography>
                © {new Date().getFullYear()} Công ty TNHH Máy Lọc Nước XYZ. Mọi quyền được bảo lưu. Thiết kế bởi{" "}
                <Link href="https://www.wrappixel.com" target="_blank" rel="noopener noreferrer">
                    Wrappixel.com
                </Link>
            </Typography>
        </Box>
    );
};

export default Footer;
