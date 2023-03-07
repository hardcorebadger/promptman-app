import PropTypes from 'prop-types'
import { Paper, Stack, Typography, IconButton, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Iconify from './Iconify';
import { useState } from 'react';
import ClickAwayListener from '@mui/base/ClickAwayListener';

// const StickyPaper = styled(Paper)(({ theme }) => ({
//     width: "calc(100% - 40px)",
//     position: "sticky",
//     bottom: 10,
//     left: "50%",
//     padding: theme.spacing(2),
//     marginTop: theme.spacing(20),
//     marginBottom: 0
//   }));

  EditableTypography.propTypes = {
    variant: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default function EditableTypography({variant, value, onChange}) {
    const [editing, setEditing] = useState(false);

    const icon = editing ? "ic:outline-download-done" : "eva:edit-fill";
    return (
        <Stack direction="row" spacing={1} >
            { editing ?
            <TextField variant="standard" value={value} 
            onChange={(event) => {
                onChange(event.target.value);
            }}
            />
            :
            <Typography variant={variant} >{value}</Typography>
            }
            <IconButton size="small" onClick={() => setEditing(!editing)}><Iconify icon={icon} width={20} height={20} /></IconButton>
        </Stack>
        
    );
}


export function EditableTypographyControlled({variant, value, isEditing, onChange, onEsc}) {

    if (isEditing) {
        return (
            <TextField 
            onClick={(event) => event.stopPropagation()}
            /* styles the wrapper */
            style={{ height:6, top:-10 }}
            /* styles the input component */
            inputProps={{
                style: {
                    height:1,
                    padding: '0 8px',
                },
            }}
            variant="outlined" value={value} size="small"
            onChange={(event) => {
                onChange(event.target.value);
            }}
            />
        );
    } else {
        return (
        <Typography variant={variant} >{value}</Typography>
        );
    }
    
}