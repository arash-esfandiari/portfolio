import React, { useState, useEffect } from 'react';

const MemoryCardGame = () => {
    const cardsArray = [
        { name: 'Apple', value: '🍎' },
        { name: 'Banana', value: '🍌' },
        { name: 'Cherry', value: '🍒' },
        { name: 'Date', value: '🍑' },
        { name: 'Elderberry', value: '🫐' },
        { name: 'Fig', value: '🍜' },
        { name: 'Grapes', value: '🍇' },
        { name: 'Honeydew', value: '🍈' },
    ];

    const [cards, setCards] = useState([]);
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [lockBoard, setLockBoard] = useState(false);
    const [matchesFound, setMatchesFound] = useState(0);
    const [flips, setFlips] = useState(0);
    const [timer, setTimer] = useState(60);
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const shuffledCards = shuffle([...cardsArray, ...cardsArray].map((card, index) => ({ ...card, id: index, flipped: false, matched: false })));
        setCards(shuffledCards);
        const interval = setInterval(() => {
            if (timer > 0) setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        if (matchesFound === cardsArray.length) {
            endGame();
        }
    }, [matchesFound]);

    const shuffle = (array) => array.sort(() => 0.5 - Math.random());

    const handleCardClick = (id) => {
        if (lockBoard) return;

        const clickedCard = cards.find((card) => card.id === id);

        // Ignore clicks on already flipped or matched cards
        if (clickedCard.flipped || clickedCard.matched) return;

        const updatedCards = cards.map((card) =>
            card.id === id ? { ...card, flipped: true } : card
        );

        setCards(updatedCards);
        setFlips((prev) => prev + 1);

        if (!firstCard) {
            setFirstCard(clickedCard);
        } else {
            setSecondCard(clickedCard);
            setLockBoard(true); // Lock the board until match/mismatch is resolved
            checkForMatch(clickedCard, updatedCards);
        }
    };

    const checkForMatch = (currentSecondCard, updatedCards) => {
        if (firstCard.value === currentSecondCard.value) {
            const matchedCards = updatedCards.map((card) =>
                card.value === currentSecondCard.value ? { ...card, matched: true } : card
            );
            setCards(matchedCards);
            setMatchesFound((prev) => prev + 1);
            resetBoard();
        } else {
            setTimeout(() => {
                const resetCards = updatedCards.map((card) =>
                    card.flipped && !card.matched ? { ...card, flipped: false } : card
                );
                setCards(resetCards);
                resetBoard();
            }, 1000);
        }
    };

    const resetBoard = () => {
        setFirstCard(null);
        setSecondCard(null);
        setLockBoard(false);
    };

    const endGame = () => {
        setLockBoard(true);
        alert(`Game over! You found ${matchesFound} matches in ${60 - timer} seconds with ${flips} flips.`);
        const newLeaderboard = [
            ...leaderboard,
            { name: 'Player 1', time: 60 - timer, flips, matches: matchesFound },
        ].sort((a, b) => a.time - b.time || a.flips - b.flips);
        setLeaderboard(newLeaderboard);
    };

    const styles = {
        body: {
            fontFamily: '"Comic Sans MS", cursive',
            backgroundColor: '#add8e6',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column',
        },
        title: {
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '20px',
        },
        info: {
            marginBottom: '20px',
            fontSize: '18px',
        },
        board: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 100px)',
            gridGap: '10px',
        },
        card: {
            width: '100px',
            height: '100px',
            backgroundColor: '#228b22',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '36px',
            color: 'white',
            cursor: 'pointer',
            borderRadius: '8px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
        },
        cardMatched: {
            backgroundColor: '#28a745',
            pointerEvents: 'none',
        },
        cardFlipped: {
            backgroundColor: '#fff',
            color: 'black',
        },
        leaderboard: {
            marginTop: '20px',
            fontSize: '18px',
        },
    };

    return (
        <div style={styles.body}>
            <div style={styles.title}>Memory Cards</div>
            <div style={styles.info}>Click on the cards to find matching pairs.</div>
            <div id="timer">Time: {timer} seconds</div>
            <div id="flips">Flips: {flips}</div>
            <div style={styles.board}>
                {cards.map((card) => (
                    <div
                        key={card.id}
                        style={{
                            ...styles.card,
                            ...(card.matched ? styles.cardMatched : {}),
                            ...(card.flipped ? styles.cardFlipped : {}),
                        }}
                        onClick={() => handleCardClick(card.id)}
                    >
                        {card.flipped || card.matched ? card.value : ''}
                    </div>
                ))}
            </div>
            <div style={styles.leaderboard}>
                <h2>Leaderboard</h2>
                {leaderboard.map((entry, index) => (
                    <div key={index}>
                        {index + 1}. {entry.name} - {entry.matches} matches, {entry.time} seconds, {entry.flips} flips
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MemoryCardGame;