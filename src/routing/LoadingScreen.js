import * as React from 'react';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingScreen() {
  return (
        <Box sx={{ positon:"absolute", height: '100vh', width: '100vw' }}>
          <CircularProgress sx={{ position: "relative", top:"50%", transform:"translateXY(-50%,-50%)", left:"50%"}} />
        </Box>
  );
}

export function LoadingWidget({width, height}) {
  return (
        <Box sx={{ positon:"absolute", height: height, width: width }}>
          <CircularProgress sx={{ position: "relative", top:"50%", transform:"translateXY(-50%,-50%)", left:"50%"}} />
        </Box>
  );
}

