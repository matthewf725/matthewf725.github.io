import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function Paper2() {
    return (
        <Container sx={{ marginTop: 4 }}>
            <Typography variant="h4" gutterBottom>
                2-Segment Paper
            </Typography>
            <Box sx={{ mt: 2 }}>
                <iframe
                    src="/3-Segment%20Perturbation.pdf"  // referencing the file from the public folder
                    title="3-Segment Draft PDF"
                    width="100%"
                    height="600px"
                    style={{ border: 'none' }}
                />
            </Box>
        </Container>
    );
}

export default Paper2;
