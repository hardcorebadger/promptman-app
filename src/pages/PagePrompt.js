import * as React from 'react';
import Footer from '../components/PageFooter';
import { Container, Grid, Typography, Stack, Button, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import {useAuth}  from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import eventBus from '../hooks/eventBus';
import { useState, useEffect } from 'react';
import { GET } from '../contexts/AuthContext';

export default function PagePrompt() {
    const { logout, user } = useAuth();
    let { id } = useParams();
    const [temp, setTemp] = useState(null);

    async function loadPrompt() {
        let resp = await GET("/api/prompt/"+id);
        setTemp(resp.response.prompt);
        console.log("dispatch" + id);
        eventBus.dispatch("promptOpened", resp.response.prompt);
      }

    useEffect(() => {
        loadPrompt();
      }, [id]);

  return (
    <Container sx={{ mt:2 }}>
        
        <Grid container spacing={3}>
            <Grid item xs={12}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
            Congrats, {user.name}
            </Typography>
            <Typography variant="body" component="h2" align="center" gutterBottom>
            You're look at prompt #{id}.
            </Typography>
            
            </Grid>
          
            <Grid item xs={12}>
            <Footer />
            </Grid>
        </Grid>
        
    </Container>
  );
}
