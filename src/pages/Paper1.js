import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function Paper1() {
    return (
        <Container sx={{ marginTop: 4 }}>
            <Typography variant="h4" gutterBottom>
                2-Segment Paper
            </Typography>
            <Box sx={{ mt: 2 }}>
                <iframe
                    src="/cgta20.pdf"  // referencing the file from the public folder
                    title="CGTA20 Paper PDF"
                    width="100%"
                    height="600px"
                    style={{ border: 'none' }}
                />
            </Box>
        </Container>
    );
}

export default Paper1;
