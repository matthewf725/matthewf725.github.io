import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function NavBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Navigation
                </Typography>
                <Button color="inherit" component={RouterLink} to="/">
                    Home
                </Button>
                <Button color="inherit" component={RouterLink} to="/paper1">
                    2-Segment Motion Planning
                </Button>
                <Button color="inherit" component={RouterLink} to="/paper2">
                    3-Segment, K-Segment Draft
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
