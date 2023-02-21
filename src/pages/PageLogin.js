import * as React from 'react';
import { Container, Checkbox, Typography, Box, Stack, Link, Alert, Tooltip, TextField, InputAdornment, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import LoginForm from '../sections/LoginForm'
import {useTitle} from "../routing/Routes";

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0),
  }));

export default function PageLogin() {
    useTitle("Login")

    return (
    <Container maxWidth="sm">
    <ContentStyle>
      <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            Sign in to Voxl
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
        </Box>


      </Stack>

    <LoginForm />

    </ContentStyle>
  </Container>
  );
}
