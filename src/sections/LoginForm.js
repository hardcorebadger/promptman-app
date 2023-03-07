import * as React from 'react';
import { useState } from 'react';
import { Container, Checkbox, Typography, Box, Stack, Link, Alert, Tooltip, TextField, InputAdornment, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../components/Iconify'
import { Link as RouterLink, Navigate } from "react-router-dom";
import { useAuth, axiosInstance } from '../contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
// ----------------------------------------------------------------------

export default function LoginForm() {
    const { login, googleLogin } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({show:false,severity:'info',display:''})

    const submit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (error) {
            console.error(error);
            setError({show:true,severity:'error',display:error.response.data.message});

        }
    };

    const googleSuccess = async (r) => {
        console.log(r);
        try {
            await googleLogin(r.credential);
        } catch (error) {
            console.error(error);
            setError({show:true,severity:'error',display:error.response.data.message});

        }
    }

    const googleError = (r) => {
        setError({show:true,severity:'error',display:'Please complete Google authentication'});
    }

  return (
      <form onSubmit={submit}>
          {error.show &&
            <Alert severity={error.severity} sx={{ mb: 3 }}>
                {error.display}
            </Alert>
        }

    <Stack spacing={3}>

        <TextField name="email" label="Email address" onChange={e => setEmail(e.target.value)}/>

        <TextField
        name="password"
        label="Password"
        type='password'
        onChange={e => setPassword(e.target.value)}
        InputProps={{
            endAdornment: (
            <InputAdornment position="end">
                <IconButton edge="end" disabled={true}>
                <Iconify icon='eva:eye-off-fill' />
                </IconButton>
            </InputAdornment>
            ),
        }}
        />
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={false}>
            Login
        </LoadingButton>
        <GoogleLogin onSuccess={googleSuccess} onError={googleError} />
    </Stack>



    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link component={RouterLink} variant="subtitle2" to='/auth/createaccount' >
            Create an Account
        </Link>
        <Link component={RouterLink} variant="subtitle2" to='/auth/reset'>
        Forgot password?
        </Link>
    </Stack>



    </form>
  );
}
