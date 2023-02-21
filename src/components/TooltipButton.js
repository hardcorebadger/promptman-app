
import {IconButton, Popover, Typography} from '@mui/material';
import Iconify from "./Iconify";
import {useTheme} from "@mui/material/styles";
import {useState} from "react";


export default function TooltipButton({ children  }) {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    return (
        <>
        <IconButton sx={{padding:0, margin:1}} onClick={handleClick}>
            <Iconify icon="dashicons:info" color={theme.palette.primary.main} fontSize="medium"/>
        </IconButton>
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}

        >
            <Typography variant="body2" color="text.secondary" sx={{maxWidth:300, p: 1.5,  backgroundColor: theme.palette.background.default,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: (theme) => theme.customShadows.z1, }}>{children}</Typography>
        </Popover>
        </>
    );
}