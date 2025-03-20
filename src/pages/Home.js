// src/pages/Home.js
import React from 'react';
import { GlobalStyles, Box, Container } from '@mui/material';
import HeroHeader from '../components/HeroHeader';
import SnakeGame from '../components/SnakeGame';
import PongGame from '../components/PongGame';
import PolygonBackground from '../components/PolygonBackground';
import ShowcaseSection from '../components/ShowcaseSection';

const Home = () => {
    return (
        <>
            <GlobalStyles
                styles={{
                    html: { overflowX: 'hidden' },
                    body: { overflowX: 'hidden' },
                }}
            />
            {/* Fixed full-screen background */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: '#1E1E1E',
                    zIndex: -4,
                    overflow: 'hidden',
                }}
            />
            {/* Center header in a container to constrain overall width */}
            <Container maxWidth="md" sx={{ px: 0 }}>
                <HeroHeader />
            </Container>
            {/* Fixed games (Snake and Pong) */}
            <SnakeGame />
            <PongGame />
            {/* Scrollable area for showcases */}
            <Box
                sx={{
                    position: 'relative',
                    width: '100vw',
                    // Push the scrollable section below the fixed games.
                    // Here we assume: header ~150px, snake game 50vh, pong game 33.33vh.
                    overflow: 'hidden',
                }}
            >
                {/* Polygon background is placed behind the showcase section */}
                <PolygonBackground />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
                    <ShowcaseSection />
                </Container>
            </Box>
        </>
    );
};

export default Home;
