import {Stack, Typography} from '@mui/material';
import Logo from './Logo';
import Label from './Label';

const VERSION = process.env.REACT_APP_VERSION || "0.0";

export default function LogoBlock(props) {
    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} >
            <Logo/>
            <Label color="secondary">v{VERSION}</Label>
        </Stack>
    );
}
