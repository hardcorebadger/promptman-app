import * as React from 'react';
import Footer from '../components/PageFooter';
import { Container, Grid, Typography, Stack, Button, FormControl, Select, InputLabel, MenuItem, TextField, Toolbar, Divider, Slider, darken } from '@mui/material';
import {useAuth}  from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import eventBus from '../hooks/eventBus';
import { useState, useEffect } from 'react';
import { GET } from '../contexts/AuthContext';
import PageLayoutFullHeight from '../layouts/PageLayoutFullHeight';
import SplitPane, { Pane } from 'react-split-pane';
import { styled } from '@mui/styles';
import StyledSplitPane from '../components/StyledSplitPane';
import theme from '../theme';
import {useTheme} from '@mui/material';
import Iconify from '../components/Iconify';


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
      },
  }));

export default function PagePrompt() {
    const { logout, user } = useAuth();
    let { id } = useParams();
    const [temp, setTemp] = useState(null);
    const theme = useTheme();
    async function loadPrompt() {
        let resp = await GET("/api/prompt/"+id);
        setTemp(resp.response.prompt);
        eventBus.dispatch("promptOpened", resp.response.prompt);
      }

    useEffect(() => {
        loadPrompt();
      }, [id]);

  return (
    <PageLayoutFullHeight>
<div style={{height: '100%', width: '100%', position:'relative', backgroundColor: theme.palette.background.well}}>
        <StyledSplitPane split="horizontal" minSize={300} defaultSize={300} style={{height:"100%"}} primary="second">
            <Pane style={{height: '100%', width: '100%'}}>
                <div style={{height: '100%', width: '100%', position:'relative', padding:25}} >
               <PromptField multiline />
               </div>
            </Pane>
            <Pane style={{
                height: '100%', width: '100%',
                '& .Pane': {
                    height: '100%', width: '100%'
                }
            }}>
            <div style={{height: '100%', width: '100%', position:'relative'
        }} >
                <Toolbar sx={{pt:2,pb:2}}>
                    <Stack sx={{width:"100%"}} direction="row" alignItems="center" justifyContent="space-between">
                        <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={2}>
                        <Typography variant="caption">Model</Typography>
                        <Select
                                value="davinci-003"
                                size="small"
                        >
                            <MenuItem value='davinci-003'>davinci-003</MenuItem>
                            <MenuItem value='ada-002'>ada-002</MenuItem>
                        </Select>
                        <Typography variant="caption">Tempurature</Typography>
                        <Slider aria-label="Temp" value={50} sx={{width:100}} size="small"/>
                        <Typography variant="caption">Max Tokens</Typography>
                        <Slider aria-label="Token" value={25} sx={{width:100}} size="small"/>
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="flex-end">
                        <Button variant="contained" color='success'
                        endIcon={<Stack direction="row"><Iconify sx={{width:15}} icon="material-symbols:keyboard-command-key"/><Iconify sx={{width:15}} icon="material-symbols:keyboard-return"/></Stack>}
                        >
                            Run
                        </Button>
                        </Stack>
                    </Stack>
                </Toolbar>
                <Divider />
                
                <div style={{height: 'calc(100% - 80px)', minHeight: 'calc(100% - 80px)', overflowY:'scroll', width: '100%', position:'relative', padding:'20px', backgroundColor: darken(theme.palette.background.well, 0.1)}}>
                <Typography>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</Typography>
                </div>
                </div>
            </Pane>
        </StyledSplitPane>
        
        </div>
        
    </PageLayoutFullHeight>
  );
}
