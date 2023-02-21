import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function PageFooter() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt:5 }}>
      {'Copyright © '}
      <Link color="inherit" href="https://voxlanalytics.com/">
        Voxl Analytics
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}