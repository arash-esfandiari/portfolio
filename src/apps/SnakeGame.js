import React, { useState, useEffect, useRef } from "react";

const BOARD_SIZE = 20; // Grid size
const SNAKE_START = [
    [10, 10],
    [10, 11],
];
const FOOD_START = [5, 5];
const SPEED = 100; // Movement speed (reduced delay)

function App() {
    const [snake, setSnake] = useState(SNAKE_START);
    const [food, setFood] = useState(FOOD_START);
    const [direction, setDirection] = useState("UP");
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [playerName, setPlayerName] = useState("");
    const [leaderboard, setLeaderboard] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);

    const gameInterval = useRef(null);
    const nextDirection = useRef(direction);

    const touchStart = useRef({ x: 0, y: 0 });
    const touchEnd = useRef({ x: 0, y: 0 });


    const handleTouchStart = (e) => {
        touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchMove = (e) => {
        e.preventDefault(); // Prevent the screen from scrolling during swipes
    };

    const handleTouchEnd = (e) => {
        touchEnd.current = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
        detectSwipe();
    };

    const detectSwipe = () => {
        const deltaX = touchEnd.current.x - touchStart.current.x;
        const deltaY = touchEnd.current.y - touchStart.current.y;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 50 && direction !== "LEFT") nextDirection.current = "RIGHT";
            if (deltaX < -50 && direction !== "RIGHT") nextDirection.current = "LEFT";
        } else {
            if (deltaY > 50 && direction !== "UP") nextDirection.current = "DOWN";
            if (deltaY < -50 && direction !== "DOWN") nextDirection.current = "UP";
        }
    };

    // Fetch leaderboard from localStorage
    useEffect(() => {
        const storedLeaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
        setLeaderboard(storedLeaderboard);
    }, []);

    // Start the game loop
    useEffect(() => {
        if (!gameOver && gameStarted) {
            gameInterval.current = setInterval(moveSnake, SPEED);
        }
        return () => clearInterval(gameInterval.current);
    }, [snake, gameOver, gameStarted]);

    // Prevent arrow keys from scrolling the page
    useEffect(() => {
        const preventScroll = (e) => {
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                e.preventDefault();
            }
        };
        window.addEventListener("keydown", preventScroll);
        return () => window.removeEventListener("keydown", preventScroll);
    }, []);

    // Handle keypress for direction
    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case "ArrowUp":
                    if (direction !== "DOWN") nextDirection.current = "UP";
                    break;
                case "ArrowDown":
                    if (direction !== "UP") nextDirection.current = "DOWN";
                    break;
                case "ArrowLeft":
                    if (direction !== "RIGHT") nextDirection.current = "LEFT";
                    break;
                case "ArrowRight":
                    if (direction !== "LEFT") nextDirection.current = "RIGHT";
                    break;
                default:
                    break;
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [direction]);

    const moveSnake = () => {
        const newSnake = [...snake];
        const head = newSnake[0];

        // Update head position based on direction
        let newHead;
        switch (nextDirection.current) {
            case "UP":
                newHead = [head[0] - 1, head[1]];
                break;
            case "DOWN":
                newHead = [head[0] + 1, head[1]];
                break;
            case "LEFT":
                newHead = [head[0], head[1] - 1];
                break;
            case "RIGHT":
                newHead = [head[0], head[1] + 1];
                break;
            default:
                return;
        }

        // Add new head and check collisions
        newSnake.unshift(newHead);
        if (checkCollision(newHead)) {
            endGame();
            return;
        }

        // Check if snake eats food
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
            setFood(generateFood());
            setScore((prev) => prev + 10);
        } else {
            newSnake.pop();
        }

        setSnake(newSnake);
        setDirection(nextDirection.current);
    };

    const generateFood = () => {
        let newFood;
        do {
            newFood = [
                Math.floor(Math.random() * BOARD_SIZE),
                Math.floor(Math.random() * BOARD_SIZE),
            ];
        } while (snake.some((part) => part[0] === newFood[0] && part[1] === newFood[1]));
        return newFood;
    };

    const checkCollision = (head) => {
        return (
            head[0] < 0 ||
            head[1] < 0 ||
            head[0] >= BOARD_SIZE ||
            head[1] >= BOARD_SIZE ||
            snake.some((part) => part[0] === head[0] && part[1] === head[1])
        );
    };

    const endGame = () => {
        clearInterval(gameInterval.current);
        setGameOver(true);
        const newEntry = { name: playerName, score };
        const updatedLeaderboard = [...leaderboard, newEntry].sort((a, b) => b.score - a.score);
        setLeaderboard(updatedLeaderboard);
        localStorage.setItem("leaderboard", JSON.stringify(updatedLeaderboard));
    };

    const resetGame = () => {
        setSnake(SNAKE_START);
        setFood(FOOD_START);
        setDirection("UP");
        setGameOver(false);
        setScore(0);
        setGameStarted(false);
    };

    return (
        <div className="snake-game" id="snake-game"
            nTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}>
            <h1>🐍 Snake Game</h1>
            {!gameStarted ? (
                <div className="start-screen ">
                    <div className="input-box">
                        <p>Enter your name to begin:</p>
                        <input
                            type="text"
                            placeholder="Your name"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                        />
                        <button onClick={() => setGameStarted(true)}>Start Game</button>
                    </div>
                    <div className="leaderboard">
                        <h2>🏆 Leaderboard</h2>
                        <ul>
                            {leaderboard.map((entry, index) => (
                                <li key={index}>
                                    {index + 1}. {entry.name} - {entry.score} points
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <>
                    <h2>Score: {score}</h2>
                    {gameOver && <h2 style={{ color: "red" }}>Game Over!</h2>}
                    <div className="snake-board">
                        {Array.from({ length: BOARD_SIZE }).map((_, row) => (
                            <div className="snake-row" key={row}>
                                {Array.from({ length: BOARD_SIZE }).map((_, col) => {
                                    const isSnake = snake.some((part) => part[0] === row && part[1] === col);
                                    const isFood = food[0] === row && food[1] === col;
                                    return (
                                        <div
                                            className="snake-cell"
                                            key={col}
                                            style={{
                                                backgroundColor: isSnake ? "green" : isFood ? "red" : "#333",
                                            }}
                                        ></div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                    {gameOver && (
                        <div className="restart-container">
                            <button className="button" onClick={resetGame}>
                                Restart Game
                            </button>
                        </div>
                    )}
                    <div className="leaderboard">
                        <h2>🏆 Leaderboard</h2>
                        <ul>
                            {leaderboard.map((entry, index) => (
                                <li key={index}>
                                    {index + 1}. {entry.name} - {entry.score} points
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
}


export default App;