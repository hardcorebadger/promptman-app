import BreadcrumbNav from '../components/BreadcrumbNav';
import { Box, Skeleton, Typography } from '@mui/material';


export default function PageHeaderStack({loading, title, subtitle, path, backPath, nopad}) {
    return (
    <Box sx={{ p:nopad?0:3, mt:nopad?3:0 }}>
        <BreadcrumbNav 
        loading={loading}
        path={path}
        pageName={title}
        backPath={backPath ? backPath : 'default'}
        />
        <Typography sx={{mt:2}} variant="h5" >
        {loading ? <Skeleton width={300} /> : title }
        </Typography>
        <Typography sx={{mt:1}} variant="body2" color="text.secondary" >
        {loading ? <Skeleton width={150} /> : subtitle }
        </Typography>
    </Box>
    );
}