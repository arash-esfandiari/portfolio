import React, { useState, useEffect, useCallback } from "react";

const initialCards = [
    { value: "🍎" }, { value: "🍎" },
    { value: "🍌" }, { value: "🍌" },
    { value: "🍇" }, { value: "🍇" },
    { value: "🍓" }, { value: "🍓" },
    { value: "🍒" }, { value: "🍒" },
    { value: "🥝" }, { value: "🥝" },
    { value: "🍍" }, { value: "🍍" },
    { value: "🍋" }, { value: "🍋" },
];

function App() {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [name, setName] = useState("");
    const [gameStarted, setGameStarted] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [leaderboard, setLeaderboard] = useState([]);
    const [moves, setMoves] = useState(0);
    const [timer, setTimer] = useState(0);
    const [timerInterval, setTimerInterval] = useState(null); // Timer Interval

    // Start the Timer
    const startTimer = () => {
        const interval = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 1000);
        setTimerInterval(interval);
    };

    // Stop the Timer
    const stopTimer = () => {
        if (timerInterval) {
            clearInterval(timerInterval);
            setTimerInterval(null);
        }
    };

    const shuffleCards = useCallback(() => {
        const shuffled = [...initialCards]
            .sort(() => Math.random() - 0.5)
            .map((card, index) => ({ ...card, id: index, matched: false }));
        setCards(shuffled);
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);
        setTimer(0);
        stopTimer(); // Stop any previous timer
        startTimer(); // Start a fresh timer
    }, []);

    const handleFlip = (card) => {
        if (disabled || flippedCards.includes(card) || card.matched) return;

        const updatedFlipped = [...flippedCards, card];
        setFlippedCards(updatedFlipped);

        if (updatedFlipped.length === 2) {
            setDisabled(true);
            setMoves((prev) => prev + 1);
            setTimeout(() => checkMatch(updatedFlipped), 800);
        }
    };

    const checkMatch = ([card1, card2]) => {
        if (card1.value === card2.value) {
            setMatchedCards((prev) => [...prev, card1, card2]);
            setCards((prev) =>
                prev.map((card) =>
                    card.value === card1.value ? { ...card, matched: true } : card
                )
            );
        }
        setFlippedCards([]);
        setDisabled(false);
    };

    const startGame = () => {
        if (name.trim()) {
            setGameStarted(true);
            shuffleCards();
        } else {
            alert("Please enter your name to start the game.");
        }
    };

    const restartGame = () => {
        stopTimer(); // Stop timer when restarting
        setName("");
        setGameStarted(false);
    };

    const endGame = () => {
        stopTimer(); // Stop the timer
        const playerScore = { name, moves, time: timer };
        const updatedLeaderboard = [...leaderboard, playerScore].sort(
            (a, b) => a.time - b.time || a.moves - b.moves
        );
        setLeaderboard(updatedLeaderboard);
        localStorage.setItem("leaderboard", JSON.stringify(updatedLeaderboard));
    };

    useEffect(() => {
        if (matchedCards.length === cards.length && cards.length > 0) {
            alert(`Congratulations, ${name}! You completed the game in ${timer} seconds with ${moves} moves.`);
            endGame();
        }
    }, [matchedCards]);

    useEffect(() => {
        const storedLeaderboard = JSON.parse(localStorage.getItem("leaderboard"));
        if (storedLeaderboard) setLeaderboard(storedLeaderboard);
    }, []);

    return (
        <section className="mc-game" id="mc-game">
            {!gameStarted ? (
                <div className="start-screen">
                    <h1>🃏 Memory Card Game</h1>
                    <div className="input-box">
                        <p>Enter your name to begin:</p>
                        <input
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button onClick={startGame}>Start Game</button>
                    </div>
                    <div className="leaderboard">
                        <h2>🏆 Leaderboard</h2>
                        <ul>
                            {leaderboard.map((player, index) => (
                                <li key={index}>
                                    {index + 1}. {player.name} - {player.time}s, {player.moves} moves
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="game-screen">
                    <h1>Good Luck, {name}!</h1>
                    <h2>Moves: {moves} | Time: {timer} seconds</h2>

                    <div className="card-grid">
                        {cards.map((card) => (
                            <div
                                key={card.id}
                                className={`card ${flippedCards.includes(card) || card.matched ? "flipped" : ""
                                    }`}
                                onClick={() => handleFlip(card)}
                            >
                                <div className="card-inner">
                                    <div className="card-front">{card.value}</div>
                                    <div className="card-back"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="restart-container" onClick={restartGame}>Restart</button>

                    <div className="leaderboard">
                        <h2>🏆 Leaderboard</h2>
                        <ul>
                            {leaderboard.map((player, index) => (
                                <li key={index}>
                                    {index + 1}. {player.name} - {player.time}s, {player.moves} moves
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </section>
    );
}

export default App;