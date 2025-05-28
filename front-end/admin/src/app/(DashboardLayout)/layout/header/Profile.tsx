import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
  ListItemButton,
  List,
  ListItemText,
} from "@mui/material";

import { Stack } from "@mui/system";
import {
  IconChevronDown,
  IconCreditCard,
  IconCurrencyDollar,
  IconMail,
  IconShield,
} from "@tabler/icons-react";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.primary.light;
  const error = theme.palette.error.main;
  const errorlight = theme.palette.error.light;
  const success = theme.palette.success.main;
  const successlight = theme.palette.success.light;
  return (
    <Box>
      <IconButton
        size="large"
        aria-label="menu"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            borderRadius: "9px",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=200&q=80"}
          alt={"ProfileImg"}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "360px",
            p: 2,
            pb: 2,
            pt:0
          },
        }}
      >

        <Box pt={0}>

          <List>
            <ListItemButton component="a" href="#">
              <ListItemText primary="Hồ sơ cá nhân" />
            </ListItemButton>
            <ListItemButton component="a" href="#">
              <ListItemText primary="Tài khoản của tôi" />
            </ListItemButton>
            <ListItemButton component="a" href="#">
              <ListItemText primary="Đổi mật khẩu" />
            </ListItemButton>
            <ListItemButton component="a" href="#">
              <ListItemText primary="Công việc của tôi" />
            </ListItemButton>
          </List>

        </Box>
        <Divider />
        <Box mt={2}>
          <Button fullWidth variant="contained" color="primary">
            Đăng xuất
          </Button>
        </Box>

      </Menu>
    </Box>
  );
};

export default Profile;
