import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from "prop-types";
import Label from "./Label";

DiscardDialog.propTypes = {
    open: PropTypes.bool,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    title: PropTypes.string,
    description: PropTypes.string,
    cancelText: PropTypes.string,
    submitText: PropTypes.string,
};

export default function DiscardDialog({title, description, cancelText = "Cancel", submitText = "Submit", open, onCancel, onSubmit}) {

    return (
        <div>
            <Dialog
                open={open}
                onClose={onCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel} autoFocus>{cancelText}</Button>
                    <Button onClick={onSubmit} >
                        {submitText}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
