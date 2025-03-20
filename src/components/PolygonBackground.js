// src/components/PolygonBackground.js
import React, { useRef, useEffect } from 'react';

const PolygonBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Create an array of polygons
        const polygons = [];
        const numPolygons = 20;
        for (let i = 0; i < numPolygons; i++) {
            polygons.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: 20 + Math.random() * 30,
                angle: Math.random() * Math.PI * 2,
                speed: 0.2 + Math.random() * 0.5,
            });
        }

        const drawPolygon = (poly) => {
            const { x, y, size, angle } = poly;
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(0, -size);
            ctx.lineTo(size, size);
            ctx.lineTo(-size, size);
            ctx.closePath();
            ctx.fillStyle = 'rgba(0,255,0,0.2)';
            ctx.fill();
            ctx.restore();
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            polygons.forEach(poly => {
                poly.y -= poly.speed;
                poly.angle += 0.01;
                if(poly.y + poly.size < 0) {
                    poly.y = canvas.height + poly.size;
                    poly.x = Math.random() * canvas.width;
                }
                drawPolygon(poly);
            });
            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1, // behind all other content
                pointerEvents: 'none',
            }}
        />
    );
};

export default PolygonBackground;
