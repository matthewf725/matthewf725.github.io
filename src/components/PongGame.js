// src/components/PongGame.js
import React, { useRef, useEffect } from 'react';

const PongGame = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            // Set canvas dimensions:
            // - width: 33.33% of the viewport width
            // - height: 33.33% of the viewport height
            canvas.width = window.innerWidth * 0.3333;
            canvas.height = window.innerHeight * 0.3333;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const handleScroll = () => {
            const scrollY = window.scrollY;
            // Move upward and fade on scroll
            canvas.style.transform = `translateY(-${Math.min(scrollY, window.innerHeight * 0.3333)}px)`;
            canvas.style.opacity = Math.max(1 - scrollY / 300, 0);
        };
        window.addEventListener('scroll', handleScroll);

        // Initial Pong game state
        let paddleWidth = 10;
        let paddleHeight = canvas.height * 0.2;
        let leftPaddle = { x: 20, y: canvas.height / 2 - paddleHeight / 2 };
        let rightPaddle = { x: canvas.width - 20 - paddleWidth, y: canvas.height / 2 - paddleHeight / 2 };
        let ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 8, vx: 5, vy: 3 };

        const update = () => {
            ball.x += ball.vx;
            ball.y += ball.vy;

            // Bounce off top and bottom
            if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
                ball.vy = -ball.vy;
            }

            // Collision with left paddle
            if (ball.x - ball.radius < leftPaddle.x + paddleWidth) {
                if (ball.y > leftPaddle.y && ball.y < leftPaddle.y + paddleHeight) {
                    ball.vx = -ball.vx;
                } else {
                    ball.x = canvas.width / 2;
                    ball.y = canvas.height / 2;
                    ball.vx = 5;
                    ball.vy = 3;
                }
            }
            // Collision with right paddle
            if (ball.x + ball.radius > rightPaddle.x) {
                if (ball.y > rightPaddle.y && ball.y < rightPaddle.y + paddleHeight) {
                    ball.vx = -ball.vx;
                } else {
                    ball.x = canvas.width / 2;
                    ball.y = canvas.height / 2;
                    ball.vx = -5;
                    ball.vy = 3;
                }
            }

            // Automated paddle movement: smoothly follow the ball
            leftPaddle.y += (ball.y - (leftPaddle.y + paddleHeight / 2)) * 0.1;
            rightPaddle.y += (ball.y - (rightPaddle.y + paddleHeight / 2)) * 0.1;
        };

        const draw = () => {
            ctx.fillStyle = '#1E1E1E';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#6A9955';
            ctx.fillRect(leftPaddle.x, leftPaddle.y, paddleWidth, paddleHeight);
            ctx.fillRect(rightPaddle.x, rightPaddle.y, paddleWidth, paddleHeight);
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#FF0000';
            ctx.fill();
        };

        const loop = () => {
            update();
            draw();
            requestAnimationFrame(loop);
        };

        loop();
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                // Vertically center the Pong game in the viewport:
                // Its height is 33.33vh so top = 50vh - (33.33vh/2) ≈ 50vh - 16.67vh
                top: 'calc(50vh - 16.67vh)',
                // Horizontally center: (100vw - 33.33vw)/2
                left: 'calc((100vw) / 2)',
                zIndex: -2,
                transition: 'transform 0.3s, opacity 0.3s'
            }}
        />
    );
};

export default PongGame;
