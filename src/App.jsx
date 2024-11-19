import { useState, useEffect } from 'react';
import { db } from './firebase';
import { ref, push, set, update, onValue, get } from 'firebase/database';
import './App.css';

function Square({ value, onSquareClick, disabled }) {
  return (
    <button 
      className={`square ${disabled ? 'disabled' : ''}`} 
      onClick={onSquareClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, playerId }) {
  const currentSquares = squares || Array(9).fill(null);
  const winner = calculateWinner(currentSquares);
  const isPlayerTurn = (xIsNext && playerId === 'X') || (!xIsNext && playerId === 'O');

  function handleClick(i) {
    if (!isPlayerTurn || winner || currentSquares[i]) {
      return;
    }

    const nextSquares = currentSquares.slice();
    nextSquares[i] = playerId;
    onPlay(nextSquares);
  }

  let status;
  if (winner) {
    status = `Câștigător: ${winner}`;
  } else if (currentSquares.every(square => square)) {
    status = "Remiză!";
  } else {
    status = `Urmează: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game-board">
      <div className="status">{status}</div>
      {[0, 1, 2].map(row => (
        <div key={row} className="board-row">
          {[0, 1, 2].map(col => {
            const i = row * 3 + col;
            return (
              <Square
                key={i}
                value={currentSquares[i]}
                onSquareClick={() => handleClick(i)}
                disabled={!isPlayerTurn || winner || currentSquares[i]}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [gameId, setGameId] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const xIsNext = currentMove % 2 === 0;

  const createGame = async () => {
    try {
      const newGameRef = push(ref(db, 'games'));
      const gameId = newGameRef.key;
      const initialGame = {
        board: Array.from({ length: 9 }, () => null),
        moves: 0,
        players: { X: gameId },
        status: 'active',
        createdAt: new Date().toISOString()
      };

      await set(newGameRef, initialGame);
      setGameId(gameId);
      setPlayerId('X');
      console.log("Joc nou creat cu ID:", gameId);
    } catch (error) {
      console.error("Eroare la crearea jocului:", error);
    }
  };

  const joinGame = async (inputGameId) => {
    try {
      const cleanGameId = inputGameId.trim();
      console.log("Încercare de alăturare la jocul:", cleanGameId);

      const gameRef = ref(db, `games/${cleanGameId}`);
      const snapshot = await get(gameRef);
      
      if (!snapshot.exists()) {
        alert("Jocul nu există!");
        return;
      }

      const gameData = snapshot.val();
      console.log("Date joc găsite:", gameData);

      if (gameData.players && gameData.players.O) {
        alert("Jocul este deja plin!");
        return;
      }

      await update(gameRef, {
        'players/O': cleanGameId,
        lastUpdate: new Date().toISOString()
      });

      setGameId(cleanGameId);
      setPlayerId('O');
      console.log("Alăturat cu succes la jocul:", cleanGameId);
    } catch (error) {
      console.error("Eroare la alăturarea la joc:", error);
      alert("Eroare la alăturarea la joc: " + error.message);
    }
  };

  async function handlePlay(nextSquares) {
    if (!gameId || !playerId) return;
  
    const isPlayerTurn = (xIsNext && playerId === 'X') || (!xIsNext && playerId === 'O');
    if (!isPlayerTurn) {
      console.log("Nu este rândul tău");
      return;
    }
  
    try {
      const gameRef = ref(db, `games/${gameId}`);
      const updates = {
        board: nextSquares,
        moves: currentMove + 1,
        lastMove: {
          player: playerId,
          timestamp: new Date().toISOString()
        }
      };
  
      await update(gameRef, updates);
      console.log("Mutare trimisă:", nextSquares);
    } catch (error) {
      console.error("Eroare la actualizarea jocului:", error);
    }
  }
  

  useEffect(() => {
    if (!gameId) return;
  
    const gameRef = ref(db, `games/${gameId}`);
    const unsubscribe = onValue(gameRef, (snapshot) => {
      const gameData = snapshot.val();
      if (!gameData) return;
  
      console.log("Date primite de la Firebase:", gameData);
  
      const boardArray = Array.isArray(gameData.board) 
        ? gameData.board 
        : Array(9).fill(null);
  
      setHistory((prevHistory) => {
        const updatedHistory = [...prevHistory];
        updatedHistory[gameData.moves] = boardArray;
        return updatedHistory;
      });
  
      setCurrentMove(gameData.moves || 0);
    });
  
    return () => unsubscribe();
  }, [gameId]);
  

  const currentSquares = history[currentMove];

  return (
    <div className="game">
      <div className="game-info">
        {!gameId ? (
          <div className="game-setup">
            <button onClick={createGame}>Creează joc nou</button>
            <div className="join-game">
              <input 
                type="text" 
                placeholder="Introdu ID-ul jocului"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    joinGame(e.target.value);
                  }
                }}
              />
              <button 
                onClick={(e) => {
                  const input = e.target.previousElementSibling;
                  if (input.value) {
                    joinGame(input.value);
                  }
                }}
              >
                Alătură-te jocului
              </button>
            </div>
          </div>
        ) : (
          <div className="game-status">
            <p>ID Joc: <strong>{gameId}</strong></p>
            <p>Joci cu: <strong>{playerId}</strong></p>
          </div>
        )}
      </div>
      {gameId && (
        <Board 
        xIsNext={xIsNext} 
        squares={history[currentMove] || Array(9).fill(null)} 
        onPlay={handlePlay}
        playerId={playerId}
      />
      )}
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
