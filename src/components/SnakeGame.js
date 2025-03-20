// src/components/SnakeGame.js
import React, { useRef, useEffect } from 'react';

const SnakeGame = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Resize canvas: full width and fixed height of 50vh
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight * 0.5;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Scroll effect: move canvas upward and reduce opacity when scrolling
        const handleScroll = () => {
            const scrollY = window.scrollY;
            canvas.style.transform = `translateY(-${Math.min(scrollY, window.innerHeight * 0.5)}px)`;
            canvas.style.opacity = Math.max(1 - scrollY / 300, 0);
        };
        window.addEventListener('scroll', handleScroll);

        // Grid and game settings
        const gridSize = 20;
        let cellSize = Math.min(canvas.width, canvas.height) / gridSize;
        // Snake1 starts on the left side, snake2 starts on the right side.
        let snake1 = [{ x: Math.floor(gridSize / 4), y: Math.floor(gridSize / 2) }];
        let snake2 = [{ x: Math.floor((gridSize * 3) / 4), y: Math.floor(gridSize / 2) }];
        let apple = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };

        const isAppleOnSnake = (applePos, snake) => snake.some(segment => segment.x === applePos.x && segment.y === applePos.y);
        while (isAppleOnSnake(apple, snake1) || isAppleOnSnake(apple, snake2)) {
            apple = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
        }

        // A* Pathfinding function
        const astar = (start, goal, obstacles) => {
            const key = (node) => `${node.x},${node.y}`;
            const heuristic = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
            const neighbors = (node) => {
                const results = [];
                const dirs = [
                    { x: 1, y: 0 },
                    { x: -1, y: 0 },
                    { x: 0, y: 1 },
                    { x: 0, y: -1 }
                ];
                dirs.forEach(d => {
                    const nx = node.x + d.x;
                    const ny = node.y + d.y;
                    if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
                        if (!obstacles.some(o => o.x === nx && o.y === ny)) {
                            results.push({ x: nx, y: ny });
                        }
                    }
                });
                return results;
            };

            let openSet = [start];
            let cameFrom = {};
            let gScore = { [key(start)]: 0 };
            let fScore = { [key(start)]: heuristic(start, goal) };

            while (openSet.length > 0) {
                let current = openSet.reduce((prev, curr) =>
                    fScore[key(curr)] < fScore[key(prev)] ? curr : prev
                );
                if (current.x === goal.x && current.y === goal.y) {
                    let path = [];
                    while (key(current) in cameFrom) {
                        path.push(current);
                        current = cameFrom[key(current)];
                    }
                    return path.reverse();
                }
                openSet = openSet.filter(n => !(n.x === current.x && n.y === current.y));
                for (const neighbor of neighbors(current)) {
                    const tentativeGScore = gScore[key(current)] + 1;
                    if (tentativeGScore < (gScore[key(neighbor)] ?? Infinity)) {
                        cameFrom[key(neighbor)] = current;
                        gScore[key(neighbor)] = tentativeGScore;
                        fScore[key(neighbor)] = tentativeGScore + heuristic(neighbor, goal);
                        if (!openSet.some(n => n.x === neighbor.x && n.y === neighbor.y)) {
                            openSet.push(neighbor);
                        }
                    }
                }
            }
            return null;
        };

        // Separate paths for both snakes
        let path1 = [];
        let pathIndex1 = 0;
        let path2 = [];
        let pathIndex2 = 0;
        const gameSpeed = 100; // Adjusted game speed (ms) for clarity
        let lastTime = Date.now();

        const gameLoop = () => {
            cellSize = Math.min(canvas.width, canvas.height) / gridSize;
            const now = Date.now();
            if (now - lastTime >= gameSpeed) {
                lastTime = now;
                // Update snake1
                const obstacles1 = snake1.slice(1);
                if (path1.length === 0 || pathIndex1 >= path1.length) {
                    const newPath = astar(snake1[0], apple, obstacles1);
                    if (newPath && newPath.length > 0) {
                        path1 = newPath;
                        pathIndex1 = 0;
                    } else {
                        path1 = [];
                        pathIndex1 = 0;
                    }
                }
                if (path1.length > 0 && pathIndex1 < path1.length) {
                    const nextPos = path1[pathIndex1];
                    snake1.unshift(nextPos);
                    if (nextPos.x === apple.x && nextPos.y === apple.y) {
                        apple = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
                        while (isAppleOnSnake(apple, snake1) || isAppleOnSnake(apple, snake2)) {
                            apple = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
                        }
                        path1 = [];
                        pathIndex1 = 0;
                        path2 = [];
                        pathIndex2 = 0;
                    } else {
                        snake1.pop();
                        pathIndex1++;
                    }
                }

                // Update snake2
                const obstacles2 = snake2.slice(1);
                if (path2.length === 0 || pathIndex2 >= path2.length) {
                    const newPath = astar(snake2[0], apple, obstacles2);
                    if (newPath && newPath.length > 0) {
                        path2 = newPath;
                        pathIndex2 = 0;
                    } else {
                        path2 = [];
                        pathIndex2 = 0;
                    }
                }
                if (path2.length > 0 && pathIndex2 < path2.length) {
                    const nextPos = path2[pathIndex2];
                    snake2.unshift(nextPos);
                    if (nextPos.x === apple.x && nextPos.y === apple.y) {
                        apple = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
                        while (isAppleOnSnake(apple, snake1) || isAppleOnSnake(apple, snake2)) {
                            apple = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
                        }
                        path1 = [];
                        pathIndex1 = 0;
                        path2 = [];
                        pathIndex2 = 0;
                    } else {
                        snake2.pop();
                        pathIndex2++;
                    }
                }
            }
            // Draw everything
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#1E1E1E';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw apple
            ctx.fillStyle = '#FF0000';
            ctx.fillRect(apple.x * cellSize, apple.y * cellSize, cellSize, cellSize);

            // Draw snake1
            ctx.fillStyle = '#6A9955';
            snake1.forEach(segment => {
                ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
            });
            // Draw snake2
            ctx.fillStyle = '#569CD6';
            snake2.forEach(segment => {
                ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
            });

            // Draw computed paths for both snakes in the same color (#00FF00)
            ctx.beginPath();
            ctx.strokeStyle = '#00FF00';
            ctx.lineWidth = 2;
            // Draw snake1's path
            if (path1.length > 0) {
                ctx.moveTo(snake1[0].x * cellSize + cellSize / 2, snake1[0].y * cellSize + cellSize / 2);
                for (let i = pathIndex1; i < path1.length; i++) {
                    ctx.lineTo(path1[i].x * cellSize + cellSize / 2, path1[i].y * cellSize + cellSize / 2);
                }
            }
            // Draw snake2's path
            if (path2.length > 0) {
                ctx.moveTo(snake2[0].x * cellSize + cellSize / 2, snake2[0].y * cellSize + cellSize / 2);
                for (let i = pathIndex2; i < path2.length; i++) {
                    ctx.lineTo(path2[i].x * cellSize + cellSize / 2, path2[i].y * cellSize + cellSize / 2);
                }
            }
            ctx.stroke();

            requestAnimationFrame(gameLoop);
        };

        gameLoop();
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
                top: '150px',
                left: '16.6667%',
                zIndex: -2,
                transition: 'transform 0.3s, opacity 0.3s'
            }}
        />
    );
};

export default SnakeGame;
