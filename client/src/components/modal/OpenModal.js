import React, { Children, useState } from 'react';
import { Modal, Box, Typography, TextField, Grid, Button, Select, InputLabel, RadioGroup, Snackbar, FormControlLabel, Radio } from '@mui/material';


const style = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    gap: '20px',
    bgcolor: 'background.paper',
    border: '2px solid #aaa',
    boxShadow: 24,
    p: 4,
    padding: '20px',
    backgroundColor: '#FFF',
};

export default function OpenModal({ isOpen, handleClose, children }) {

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
        >
            <Box sx={style}>
                {children}
            </Box>
        </Modal >
    )
}
