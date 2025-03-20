// src/components/ShowcaseSection.js
import React from 'react';
import { Container, Grid, Card, CardContent, CardActions, CardMedia, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const ShowcaseSection = () => {
    return (
        <Container sx={{ mt: 'calc(50vh)', mb: 4, width: '100%' }}>
            <Grid container spacing={4}>
                <Grid item xs={12} sx={{ minHeight: '20vh' }}>
                    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                        <CardMedia
                            component="img"
                            height="300"
                            image="https://via.placeholder.com/800x300?text=Research+Paper+1"
                            alt="2-Segment Paper"
                        />
                        <CardContent>
                            <Typography variant="h5" color="primary">
                                2-Segment Paper
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Publication by Dr. Ka Yaw Teo, Context for 3/K-Segment Problem
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" component={RouterLink} to="/paper1">
                                Learn More
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sx={{ minHeight: '20vh' }}>
                    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                        <CardMedia
                            component="img"
                            height="300"
                            image="https://via.placeholder.com/800x300?text=Research+Paper+2"
                            alt="3-Segment, K-Segment Draft"
                        />
                        <CardContent>
                            <Typography variant="h5" color="primary">
                                3-Segment, K-Segment Draft
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Draft - Perturbation of cases
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" component={RouterLink} to="/paper2">
                                Learn More
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ShowcaseSection;
