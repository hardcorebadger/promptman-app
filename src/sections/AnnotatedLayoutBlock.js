import {Box, Grid, Typography} from '@mui/material';


export default function AnnotatedLayoutBlock({title, description, children}) {
    return (
        <Box>
        <Grid container spacing={3}>
            <Grid item sm={3} xs={12}>
                <Typography variant={"h6"}>{title}</Typography>
                <Typography variant={"body2"} color={"text.secondary"}>{description}</Typography>
            </Grid>
            <Grid item sm={3} xs={12}></Grid>

            <Grid item sm={6} xs={12}>
                {children}
            </Grid>
        </Grid>
        </Box>
    );
}