import PropTypes from 'prop-types'
import { Paper, Stack, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';


const StickyPaper = styled(Paper)(({ theme }) => ({
    width: "calc(100% - 40px)",
    position: "sticky",
    bottom: 10,
    left: "50%",
    padding: theme.spacing(2),
    marginTop: theme.spacing(20),
    marginBottom: 0
  }));

ContextualSaveBar.propTypes = {
    changesExist: PropTypes.func,
    onSave: PropTypes.func,
    onDiscard: PropTypes.func
};

export default function ContextualSaveBar({changesExist, onSave, onDiscard}) {

    if (!changesExist())
        return <></>;

    return (
        <StickyPaper elevation={2}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" >
                <Typography>
                    Unsaved Changes
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" color="inherit" onClick={onDiscard}>Discard Changes</Button>  
                    <Button variant="contained" color="primary" onClick={onSave}>Save Changes</Button>
                </Stack>
            </Stack>
        </StickyPaper>
    );
}