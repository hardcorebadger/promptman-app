import * as React from 'react';
import { useState } from 'react';
import { Container, Checkbox, Typography, Box, Stack, Link, Alert, Tooltip, TextField, InputAdornment, IconButton, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../components/Iconify'
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {useAuth, axiosInstance, POST} from '../contexts/AuthContext';
// ----------------------------------------------------------------------

export default function CreateAccountForm({invite, token}) {
    const { register } = useAuth();
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState(invite != null ? invite.invite.email : "");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [error, setError] = useState({show:false,severity:'info',display:''})
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(email, first, last, password, cpassword, token);
            if (token == null) {
                navigate("/", {replace: true});
            }
        } catch (error) {
            console.log(error.response.data);
            if (error.response) {
                // const msg = error.response.data;
                // const fields = Object.keys(msg);
                // const err = msg[fields[0]];
                setError({show:true,severity:'error',display: "There was an error"});
            }
        }
   
    };

  return (
      <form onSubmit={submit}>
          {error.show &&
            <Alert severity={error.severity} sx={{ mb: 3 }}>
                {error.display}
            </Alert>
        }


    <Stack spacing={3}>
        <Stack spacing={3} direction="row">
            <TextField fullWidth name="first" label="First Name" onChange={e => setFirst(e.target.value)} />
            <TextField fullWidth name="last" label="Last Name" onChange={e => setLast(e.target.value)} />
        </Stack>
            <TextField fullWidth name="email" value={email} disabled={invite != null} label="Email Address" onChange={e => setEmail(e.target.value)} />
            <TextField fullWidth name="password" label="Password" type={"password"} onChange={e => setPassword(e.target.value)} />
            <TextField fullWidth name="cpassword" label="Confirm Password" type="password" onChange={e => setCpassword(e.target.value)} />
            
            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={false}>Register</LoadingButton>
        <Typography textAlign={"center"} sx={{mt:2}}>
            Already have an account?&nbsp;
            <Link component={RouterLink} variant="subtitle2" to='/auth/login'>
                Sign In
            </Link>
        </Typography>
    </Stack>
    
    </form>
  );
}
