import React, { useState, useEffect, useRef } from "react";
import "../styles/apps/SnakeGame.css"

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [
    [10, 10],
    [10, 11],
];
const INITIAL_FOOD = [5, 5];
const SPEED = 100;

function SnakeGame() {
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState(INITIAL_FOOD);
    const [direction, setDirection] = useState("LEFT");
    const [score, setScore] = useState(0);
    const [name, setName] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [leaderboard, setLeaderboard] = useState([{ name: "Arash", score: 200 }, { name: "Ayman", score: 590 }]);
    const nextDirection = useRef(direction);
    const gameInterval = useRef(null);
    const gameGridRef = useRef(null); // Reference to the game grid
    const touchStart = useRef({ x: 0, y: 0 });
    const touchEnd = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (gameStarted && !gameOver) {
            gameInterval.current = setInterval(moveSnake, SPEED);
        }
        return () => clearInterval(gameInterval.current);
    }, [snake, gameStarted, gameOver]);

    // Prevent scrolling for arrow keys
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                e.preventDefault();
                if (e.key === "ArrowUp" && direction !== "DOWN") nextDirection.current = "UP";
                if (e.key === "ArrowDown" && direction !== "UP") nextDirection.current = "DOWN";
                if (e.key === "ArrowLeft" && direction !== "RIGHT") nextDirection.current = "LEFT";
                if (e.key === "ArrowRight" && direction !== "LEFT") nextDirection.current = "RIGHT";
            }
        };
        window.addEventListener("keydown", handleKeyDown, { passive: false });
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [direction]);

    // Handle swipe gestures and prevent scroll within grid
    useEffect(() => {
        const handleTouchStart = (e) => {
            if (gameGridRef.current && gameGridRef.current.contains(e.target)) {
                e.preventDefault(); // Prevent scroll
            }
            touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        };

        const handleTouchEnd = (e) => {
            if (gameGridRef.current && gameGridRef.current.contains(e.target)) {
                e.preventDefault(); // Prevent scroll
            }
            touchEnd.current = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
            handleSwipe();
        };

        const handleSwipe = () => {
            const deltaX = touchEnd.current.x - touchStart.current.x;
            const deltaY = touchEnd.current.y - touchStart.current.y;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 0 && direction !== "LEFT") nextDirection.current = "RIGHT";
                if (deltaX < 0 && direction !== "RIGHT") nextDirection.current = "LEFT";
            } else {
                if (deltaY > 0 && direction !== "UP") nextDirection.current = "DOWN";
                if (deltaY < 0 && direction !== "DOWN") nextDirection.current = "UP";
            }
        };

        document.addEventListener("touchstart", handleTouchStart, { passive: false });
        document.addEventListener("touchend", handleTouchEnd, { passive: false });

        return () => {
            document.removeEventListener("touchstart", handleTouchStart);
            document.removeEventListener("touchend", handleTouchEnd);
        };
    }, [direction]);


    useEffect(() => {
        const storedLeaderboard = JSON.parse(localStorage.getItem("snake-leaderboard"));
        if (storedLeaderboard) setLeaderboard(storedLeaderboard);
    }, []);


    const updateLeaderboard = () => {
        const playerScore = { name: name || "Anonymous", score };
        const updatedLeaderboard = [...leaderboard, playerScore]
            .sort((a, b) => b.score - a.score) // Sort by score in descending order
            .slice(0, 5); // Keep only the top 5 results
        setLeaderboard(updatedLeaderboard);
        localStorage.setItem("snake-leaderboard", JSON.stringify(updatedLeaderboard));
    };

    const moveSnake = () => {
        const newSnake = [...snake];
        const head = newSnake[0];
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

        if (
            newHead[0] < 0 ||
            newHead[1] < 0 ||
            newHead[0] >= BOARD_SIZE ||
            newHead[1] >= BOARD_SIZE ||
            snake.some((part) => part[0] === newHead[0] && part[1] === newHead[1])
        ) {
            setGameOver(true);
            clearInterval(gameInterval.current);
            // Update leaderboard
            updateLeaderboard(score, name);
            return;
        }

        newSnake.unshift(newHead);
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
            setFood(generateFood());
            setScore(score + 10);
        } else {
            newSnake.pop();
        }

        setSnake(newSnake);
        setDirection(nextDirection.current);
    };

    const generateFood = () => {
        let newFood;
        const isFoodOnSnake = (foodPosition) => {
            return snake.some(
                (part) => part[0] === foodPosition[0] && part[1] === foodPosition[1]
            );
        };

        do {
            newFood = [
                Math.floor(Math.random() * BOARD_SIZE),
                Math.floor(Math.random() * BOARD_SIZE),
            ];
        } while (isFoodOnSnake(newFood));

        return newFood;
    };

    const resetGame = () => {
        setSnake(INITIAL_SNAKE);
        setFood(INITIAL_FOOD);
        setScore(0);
        nextDirection.current = "LEFT";
        setGameOver(false);
        setGameStarted(false);
    };

    return (
        <div id="snake-game">
            <h1>The 🐍 Game</h1>
            {!gameStarted ? (
                <div className="start-screen">
                    <div className="input-box">
                        <p>Enter your name to begin:</p>
                        <input
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button onClick={() => setGameStarted(true)}>Start Game</button>
                    </div>
                </div>
            ) : (
                <>
                    <h2>Score: {score}</h2>
                    {gameOver && <h2 style={{ color: "red" }}>Game Over!</h2>}
                    <div ref={gameGridRef} className="snake-board">
                        {Array.from({ length: BOARD_SIZE }).map((_, row) => (
                            <div key={row} className="snake-row">
                                {Array.from({ length: BOARD_SIZE }).map((_, col) => {
                                    const isSnake = snake.some((part) => part[0] === row && part[1] === col);
                                    const isFood = food[0] === row && food[1] === col;
                                    return (
                                        <div
                                            key={col}
                                            className={`snake-cell ${isSnake ? "snake" : ""} ${isFood ? "food" : ""}`}
                                        ></div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                    {gameOver && (
                        <div className="restart-container">
                            <button onClick={resetGame}>Restart Game</button>
                        </div>
                    )}
                </>
            )}
            <div className="leaderboard">
                <h2>🏆 Leaderboard</h2>
                <ul>
                    {leaderboard.map((entry, index) => (
                        <li key={index}>
                            {entry.name}: {entry.score} points
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SnakeGame;