import { Box, Divider, Link, Stack, LinearProgress } from '@mui/material';


export default function PerformanceBar({roas, contribution}) {
    const prog = roas * 100 > 100 ? 100 : roas * 100;
    const minWidth = 0;
    const maxWidth = 100;
    const width = minWidth + (contribution * (maxWidth-minWidth));
    
    return (
        <Box sx={{width:"100%"}}>
            <LinearProgress sx={{width:width+'%'}} variant="determinate" value={prog} />
        </Box>
        
    );
}