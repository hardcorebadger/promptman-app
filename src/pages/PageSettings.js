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
import {GET, PUT, useAuth} from "../contexts/AuthContext";
import {useState} from "react";
import Iconify from '../components/Iconify';
import eventBus from '../hooks/eventBus';

export default function PageSettings({invite, token}) {
    useTitle("Settings");
    const { user, refreshUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [key, setKey] = useState(user.project.openai_api_key === null ? '' : user.project.openai_api_key);
    const navigate = useNavigate();

    async function setApiKey() {
        mixpanel.track('Submitted OpenAI API Key');
        setLoading(true);
        setError(null);
        let resp = await PUT("/api/project/"+user.project.id+"/api_key", {
            openai_api_key:key
        });
        if (resp.success) {
            mixpanel.track('Linked OpenAI API Key');
            refreshUser();
        } else {
            mixpanel.track('Failed to Link OpenAI API Key');
            setError({
                severity:'error', 
                display:resp.response.message
            });
        }
        setLoading(false);
      }

    return (
        <Box sx={{ position: 'relative', width: '100%', height: 'calc(100vh - 60px)' }}>
            <Box sx={{ position: 'absolute', top:'50%', left:'50%', transform: 'translateX(-50%) translateY(-50%)' }}>
                <Container maxWidth="sm" >
                    <Stack direction="column" spacing={3} sx={{pr:4, pl:4}}>
                    <Stack direction="column" spacing={1}>

                        <Typography variant="h5" textAlign={"center"} gutterBottom>
                            Enter your OpenAI API key
                        </Typography>
                        <Typography textAlign={"center"} sx={{ color: 'text.secondary' }}>Enter your OpenAI API Key to use hyperprompt.</Typography>
                       </Stack>
                       {error &&
                            <Alert severity={error.severity} sx={{ mb: 3 }}>
                                {error.display}
                            </Alert>
                            }
                        <Stack direction="row" spacing={1}>
                            
                            <TextField
                            fullWidth
                                name="apikey"
                                label="API Key"
                                type='password'
                                placeholder='sk-........'
                                value={key}
                                onChange={e => setKey(e.target.value)}
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
                            <LoadingButton size="large" sx={{m:1}} variant="contained" loading={loading} onClick={setApiKey} >Save</LoadingButton>
                        </Stack>
                        <Typography  textAlign={"center"} variant="caption" color="text.secondary"> Using your own API key allows you to pay for token usage directly and keeps Hyperpropt 100% free. 
                        If you don't have an API key, <Link href="https://elephas.app/blog/how-to-create-openai-api-keys-cl5c4f21d281431po7k8fgyol0" target="_blank">here's</Link> a good guide on getting started!</Typography>
                        
                    </Stack>
                </Container>
            </Box>
        </Box>

    );
}
