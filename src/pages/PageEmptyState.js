import * as React from 'react';
import {
    Container,
    Checkbox,
    Typography,
    Box,
    Stack,
    Link,
    Alert,
    Tooltip,
    TextField,
    InputAdornment,
    IconButton,
    Button, CssBaseline
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import LoginForm from '../sections/LoginForm'
import {useTitle} from "../routing/Routes";
import {Link as RouterLink, Outlet, useNavigate} from "react-router-dom";
import {GET, POST} from "../contexts/AuthContext";
import {useState} from "react";

export default function PageEmptyState({invite, token}) {
    useTitle("Accept Invitation");

    return (
        <Box sx={{ position: 'relative', width: '100%', height: 'calc(100vh - 60px)' }}>
            <Box sx={{ position: 'absolute', top:'50%', left:'50%', transform: 'translateX(-50%) translateY(-50%)' }}>
                <Container maxWidth="sm" >
                    <Stack direction="column" spacing={2} sx={{pr:4, pl:4}}>
                        <Typography variant="h5" textAlign={"center"} gutterBottom>
                            Feels empty in here...
                        </Typography>
                        <Typography textAlign={"center"} sx={{ color: 'text.secondary' }}>You don't have access to any properties. Contact your team members to receive an invite.</Typography>
                    </Stack>
                </Container>
            </Box>
        </Box>

    );
}
