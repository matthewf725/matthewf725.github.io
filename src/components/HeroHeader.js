// src/components/HeroHeader.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const HeroHeader = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: { xs: '80px', md: '100px' }, // smaller header
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0, 122, 204, 0.7)', // semi-transparent blue
                color: '#FFFFFF',
                clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
                mb: 0,
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
                    textAlign: 'center',
                }}
            >
                Current Work
            </Typography>
        </Box>
    );
};

export default HeroHeader;
