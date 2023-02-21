import * as React from 'react';
import { Drawer, Container, Box, CssBaseline } from '@mui/material';
import { Outlet } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Logo from '../components/Logo';

export default function SplashLayout() {

  return (
    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh' }}>
      <Box sx={{ position: 'relative', top:'50%', transform: 'translateY(-50%)' }}>
      <CssBaseline />

      <Outlet />
      </Box>
    </Box>
  );
}