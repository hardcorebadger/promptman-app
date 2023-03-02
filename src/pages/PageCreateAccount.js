import * as React from 'react';
import { Container, Checkbox, Typography, Box, Stack, Link, Alert, Tooltip, TextField, InputAdornment, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import CreateAccountForm from '../sections/CreateAccountForm'
import {useTitle} from "../routing/Routes";
import Logo from '../components/Logo';

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0),
  }));

export default function PageCreateAccount({invite}) {
    useTitle("Create Account")

    return (
    <Container maxWidth="sm">
    <ContentStyle>
      <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Logo/>
          <Typography variant="h4" sx={{mt:3}} gutterBottom>
              { invite ? "Join your team on Voxl" : "Create an Account" }
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{
              invite ? `${invite.inviter.first_name} has invited to join ${invite.property.domain} on Voxl. To get started, create an account below.` : "Enter your details below."
          }</Typography>
        </Box>


      </Stack>

    <CreateAccountForm invite={invite}/>

    </ContentStyle>
  </Container>
  );
}
