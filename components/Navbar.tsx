"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FlexBetween from "./FlexBetween";
import logo from "../public/logo.svg";
import Image from "next/image";
import { logout } from "@/lib/redux/features/auth/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store/store";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";

const settings = ["Logout"];

function Navbar() {
  const auth = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlLogout = () => {
    dispatch(logout())
    handleCloseNavMenu();
    router.push('/');
  }


  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box>
            <Image src={logo} alt="logo" width={80} height={80} />
          </Box>

          <FlexBetween gap="1.5rem">
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/2.jpg"
                    sx={{ width: "34px", height: "34px" }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={auth.data?.id} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" >{auth.data?.name}</Typography>
                </MenuItem>
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handlLogout}>
                    <Typography textAlign="center" >{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </FlexBetween>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
