import * as React from 'react';
import Footer from '../components/PageFooter';
import { Container, Grid, Typography, Stack, Button, FormControl, Select, InputLabel, MenuItem, TextField, Toolbar, Divider, Slider, darken } from '@mui/material';
import {useAuth}  from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import eventBus from '../hooks/eventBus';
import { useState, useEffect, useCallback } from 'react';
import { GET, PUT } from '../contexts/AuthContext';
import PageLayoutFullHeight from '../layouts/PageLayoutFullHeight';
import SplitPane, { Pane } from 'react-split-pane';
import { styled } from '@mui/styles';
import StyledSplitPane from '../components/StyledSplitPane';
import theme from '../theme';
import {useTheme} from '@mui/material';
import Iconify from '../components/Iconify';
import { LoadingButton } from '@mui/lab';
import { IntegrationInstructionsRounded } from '@mui/icons-material';


const PromptField = styled(TextField)(({ theme })  => ({
    width: "100%",
    height: "100%",

    "& .MuiInputBase-root.MuiOutlinedInput-root": {
        width: "100%",
        height: "100%",
      },
      "& .MuiInputBase-root.MuiOutlinedInput-root textarea": {
        width: "100%",
        height: "100%!important",
        overflow:"scroll!important"
      },
  }));

export default function PagePrompt() {
    const { logout, user } = useAuth();
    let { id } = useParams();
    const [name, setName] = useState(null);
    const [payload, setPayload] = useState("");
    const [settings, setSettings] = useState(null);
    const [running, setRunning] = useState(false);
    const [completion, setCompletion] = useState(null);
    const theme = useTheme();

    async function loadPrompt() {
        let cache = loadCache();
        if (cache != null) {
            console.log(cache);
            setCompletion(cache.completion);
            setPayload(cache.payload);
            setSettings(cache.settings);
            setName(cache.name);
            cache.id = id;
            eventBus.dispatch("promptOpened", cache);
        } else {
            setCompletion(null);
            setPayload("");
            setSettings(null);
            setName(null);
            let resp = await GET("/api/prompt/"+id);
            setPayload(resp.response.prompt.payload);
            setSettings(resp.response.prompt.settings);
            setName(resp.response.prompt.name);
            eventBus.dispatch("promptOpened", resp.response.prompt);
        }
    }

    async function runPrompt() {
        setRunning(true);
        // console.log(payload);
        // console.log(settings);
        let resp = await PUT("/api/prompt/"+id+"/run", {
            "payload":payload,
            "settings":settings
        });
        setCompletion(resp.response.completion);
        setRunning(false);
    }

    function setModel(value) {
        setSettings({
            ...settings,
            model:value
        });
    }

    function setTemp(value) {
        setSettings({
            ...settings,
            tempurature:value
        });
    }

    function setMaxTokens(value) {
        setSettings({
            ...settings,
            max_tokens:Math.round(value)
        });
        
    }

    function saveCache() {
        localStorage.setItem('prompt-cache-'+id, JSON.stringify({
            payload: payload,
            settings: settings,
            completion: completion,
            name: name
        }));
    }

    function loadCache() {
        let raw = localStorage.getItem('prompt-cache-'+id);
        if (raw === null)
            return null;
        return JSON.parse(raw);
    }

    useEffect(() => {
        loadPrompt();
      }, [id]);

    // when stuff updates, cache it
    useEffect(() => {
        saveCache();
    }, [payload, settings, completion, name]);


    const handleKeyPress = useCallback((e) => {
        if (e.keyCode===13 && e.metaKey) {
            runPrompt();
        }
        
    }, [payload, settings]);


    useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress);

    // remove the event listener
    return () => {
        document.removeEventListener('keydown', handleKeyPress);
    };
    }, [handleKeyPress]);

  return (
    <PageLayoutFullHeight>
<div style={{height: '100%', width: '100%', position:'relative', backgroundColor: theme.palette.background.default}}>
        <StyledSplitPane split="horizontal" minSize={200} defaultSize={300} style={{height:"100%"}} primary="second">
            <Pane style={{height: '100%', width: '100%'}} className="">
                <div style={{height: '100%', width: '100%', position:'relative', padding:25}} >
               <PromptField multiline value={payload} onChange={(e) => setPayload(e.target.value)}/>
               </div>
            </Pane>
            <Pane className="" style={{
                height: '100%', width: '100%'
            }}>
            <div style={{height: '100%', width: '100%', position:'relative'
        }} >
            {settings &&
                <Toolbar sx={{pt:2,pb:2}}>
                    <Stack sx={{width:"100%"}} direction="row" alignItems="center" justifyContent="space-between">
                        <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={2}>
                        <Typography variant="caption">Model</Typography>
                        <Select
                                value={settings?.model}
                                onChange={(e) => setModel(e.target.value)}
                                size="small"
                        >
                            <MenuItem value='text-davinci-003'>text-davinci-003</MenuItem>
                            <MenuItem value='text-curie-001'>text-curie-001</MenuItem>
                            <MenuItem value='text-babbage-001'>text-babbage-001</MenuItem>
                            <MenuItem value='text-ada-001'>text-ada-001</MenuItem>
                        </Select>
                        <Typography variant="caption">Tempurature</Typography>
                        <Slider aria-label="Temp" value={settings?.tempurature * 100} sx={{width:100}} size="small" onChange={(e, v) => setTemp(v/100)} />
                        <Typography variant="caption">Max Tokens</Typography>
                        <Slider aria-label="Token" vvalue={settings?.max_tokens / 2048 * 100} sx={{width:100}} size="small" onChange={(e, v) => setMaxTokens(v / 100 * 2048)}/>
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="flex-end">
                        <LoadingButton variant="contained" color='success' onClick={runPrompt} loading={running}
                        endIcon={<Stack direction="row"><Iconify sx={{width:15}} icon="material-symbols:keyboard-command-key"/><Iconify sx={{width:15}} icon="material-symbols:keyboard-return"/></Stack>}
                        >
                            Run
                        </LoadingButton>
                        </Stack>
                    </Stack>
                </Toolbar>
}
                <Divider />
                
                <div style={{height: 'calc(100% - 80px)', minHeight: 'calc(100% - 80px)', overflowY:'scroll', width: '100%', position:'relative', padding:'20px', backgroundColor: darken(theme.palette.background.default, 0.1)}}>
                <Typography variant="code">{completion?.choices[0].text}</Typography>
                </div>
                </div>
            </Pane>
        </StyledSplitPane>
        
        </div>
        
    </PageLayoutFullHeight>
  );
}
