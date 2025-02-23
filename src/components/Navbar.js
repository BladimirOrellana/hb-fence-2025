"use client";

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  Box,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

export default function Navbar() {
  const { user, logout, loading } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  if (loading) return null; // Hide navbar while loading

  return (
    <>
      {/* ✅ Top Navbar */}
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "limegreen", width: "100%" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* ✅ Logo / Brand Name */}
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
            HB Fence
          </Typography>

          {/* ✅ Desktop Navigation (Now Horizontal) */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <NavLinks user={user} logout={logout} />
          </Box>

          {/* ✅ Mobile Menu Button */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* ✅ Mobile Navigation Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Menu
          </Typography>
          <NavLinks
            user={user}
            logout={logout}
            isMobile
            closeDrawer={toggleDrawer}
          />
        </Box>
      </Drawer>
    </>
  );
}

/* ✅ NavLinks Component - Now Uses `display: flex` for Horizontal Layout */
const NavLinks = ({ user, logout, isMobile, closeDrawer }) => {
  const handleClose = () => isMobile && closeDrawer();

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      <Link href="/" passHref>
        <Button sx={navButtonStyles} onClick={handleClose}>
          Home
        </Button>
      </Link>
      {user ? (
        <>
          <Link href="/profile" passHref>
            <Button sx={navButtonStyles} onClick={handleClose}>
              Profile
            </Button>
          </Link>
          {user.role === "admin" && (
            <Link href="/admin" passHref>
              <Button sx={navButtonStyles} onClick={handleClose}>
                Admin
              </Button>
            </Link>
          )}
          <Button
            sx={navButtonStyles}
            color="error"
            onClick={() => {
              logout();
              handleClose();
            }}
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Link href="/login" passHref>
            <Button sx={navButtonStyles} onClick={handleClose}>
              Login
            </Button>
          </Link>
          <Link href="/signup" passHref>
            <Button sx={navButtonStyles} onClick={handleClose}>
              Sign Up
            </Button>
          </Link>
        </>
      )}
    </Box>
  );
};

/* ✅ Button Styles */
const navButtonStyles = {
  color: "white",
  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
};
