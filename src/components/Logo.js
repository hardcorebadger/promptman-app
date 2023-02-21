import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Logo(props) {
    const theme = useTheme();
    const color = props.color ? props.color : theme.palette.secondary.main;
    return (
        <Box component={RouterLink} to='/' sx={{ width: 48, height: 16, display:'inline-block' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 257.31 82.56">
                <g fill={color} id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                    <path d="M176.58,78.3a16.58,16.58,0,0,0,10.23,4.26h29.48c3.3,0,4.09-1.91,1.77-4.26l-73.56-74A16.63,16.63,0,0,0,134.27,0H96a10.37,10.37,0,0,0-8.57,5.42L65.06,52.68c-1.41,3-3.18,6.73-3.94,8.32s-2,1.59-2.72,0l-3.85-8.37L32.82,5.45A10.23,10.23,0,0,0,24.31,0H4C.69,0-.88,2.45.5,5.45L33.44,77.11a10.21,10.21,0,0,0,8.5,5.45H77.47A10.36,10.36,0,0,0,86,77.14L110.5,25.49,114,18.14a1.41,1.41,0,0,1,2.42-.42l5.74,5.78Z"/><path d="M141.71,82.56c3.3,0,4.11-1.93,1.8-4.28L125.35,59.75C123,57.39,120.11,58,118.83,61l-6.74,16c-1.28,3,.38,5.53,3.68,5.53Z"/><path d="M179.33,0c-3.3,0-4.11,1.93-1.81,4.29l18.16,18.52c2.31,2.36,5.25,1.8,6.53-1.24l6.73-16c1.28-3-.37-5.53-3.67-5.53Z"/><rect x="227.89" width="29.42" height="82.56" rx="6"/>
                    </g>
                </g>
            </svg>
        </Box>
    );
}