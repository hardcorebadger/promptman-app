import * as React from 'react';
import Footer from '../components/PageFooter';
import { Container, Grid, Typography, Stack, Button, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import {useAuth}  from '../contexts/AuthContext';

export default function PageDefault() {
    const { logout, user } = useAuth();
  return (
    <Container sx={{ mt:2 }}>
        
        <Grid container spacing={3}>
            <Grid item xs={12}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
            Welcome to Voxl, {user.name}.
            </Typography>
            </Grid>
            <Grid item xs={3}>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value='10'
                    label="Age"
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <Stack spacing={2} direction="row">
            <Button variant="text" onClick={logout}>Text</Button>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
            </Stack>
           
            </Grid>
            <Grid item xs={12}>
            <Footer />
            </Grid>
        </Grid>
        
    </Container>
  );
}
