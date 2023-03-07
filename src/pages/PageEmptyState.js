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
import {GET, POST, useAuth} from "../contexts/AuthContext";
import {useState} from "react";
import Iconify from '../components/Iconify';
import eventBus from '../hooks/eventBus';

export default function PageEmptyState({invite, token}) {
    useTitle("Welcome");
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function newPrompt() {
        setLoading(true);
        let resp = await POST("/api/file/", {
            type:"prompt",
            name:"New Prompt",
            project:user.project.id
        });
        eventBus.dispatch("refreshFiles",{});
        navigate('/dashboard/prompt/'+resp.response.file.content_id);
        setLoading(false);
      }

    return (
        <Box sx={{ position: 'relative', width: '100%', height: 'calc(100vh - 60px)' }}>
            <Box sx={{ position: 'absolute', top:'50%', left:'50%', transform: 'translateX(-50%) translateY(-50%)' }}>
                <Container maxWidth="sm" >
                    <Stack direction="column" spacing={2} sx={{pr:4, pl:4}}>
                        <Typography variant="h5" textAlign={"center"} gutterBottom>
                            Feels empty in here...
                        </Typography>
                        <Typography textAlign={"center"} sx={{ color: 'text.secondary' }}>If you're new here, you can start by creating a prompt below. Otherwise, select one of your prompts to get started. Happy prompting!</Typography>
                        <Stack direction="row" spacing={0} justifyContent="center">
                            <LoadingButton size="large" startIcon={<Iconify icon="material-symbols:add"/>} sx={{m:1}} variant="contained" loading={loading} onClick={newPrompt} >Create a Prompt</LoadingButton>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </Box>

    );
}
