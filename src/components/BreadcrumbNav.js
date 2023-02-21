import { Box, Skeleton, Link, Stack, Typography, Breadcrumbs, IconButton } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
import Iconify from './Iconify';

export default function BreadcrumbNav({loading, path, pageName, backPath}) {
    
    if (loading) {
        return (
            <Stack direction="row" spacing={1} alignItems="center">
            <Skeleton variant="text" width={100} />
            </Stack>
        );
    } else {
        let back = null;
        if (backPath == 'default') {
            back = path.length > 0 ? path[path.length-1].dest : null;
        } else if (backPath != null) {
            back = backPath;
        } else {
            back = null;
        }
        return (
            <Stack direction="row" spacing={1} alignItems="center">
                {back &&
            <IconButton className="outlined" component={RouterLink} to={back}>
            <Iconify icon="eva:arrow-ios-back-outline" fontSize="medium"/> 
            </IconButton>
            }
            <Breadcrumbs aria-label="breadcrumb">
                {path.map((crumb, index)=>
                <Link key={index}
                component={RouterLink} to={crumb.dest}
                variant="caption" underline="hover" color="inherit" href="/">
                    {crumb.display}
                </Link>
                )}
                <Typography color="text.primary" variant="caption">{pageName}</Typography>
            </Breadcrumbs>
            </Stack>
        );
    }
}
