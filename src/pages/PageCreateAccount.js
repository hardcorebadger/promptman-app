import * as React from 'react';
import { Container, Checkbox, Typography, Box, Stack, Link, Alert, Tooltip, TextField, InputAdornment, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import CreateAccountForm from '../sections/CreateAccountForm'
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

export default function PageCreateAccount({invite, token}) {
    useTitle("Create Account")

    return (
    <Container maxWidth="sm">
    <ContentStyle>
      <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
              { invite ? "Join your team on Voxl" : "Create an Account" }
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{
              invite ? `${invite.inviter.first_name} has invited to join ${invite.property.domain} on Voxl. To get started, create an account below.` : "Enter your details below."
          }</Typography>
        </Box>


      </Stack>

    <CreateAccountForm invite={invite} token={token} />

    </ContentStyle>
  </Container>
  );
}
