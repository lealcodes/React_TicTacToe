"use client";

import { useState } from "react";

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Board({ squares, xIsNext, onPlay }) {
  function onSquareClick(idx) {
    console.log("INSIDE SQUARE CLICK OF BOARD COMP FUNC");
    // this if check works because null is falsey and anything on it is truthy
    if (squares[idx] || checkWinner(squares)) return;
    // slice makes a copy of the existing array so it does not reference the same thing
    const new_squares = squares.slice();
    new_squares[idx] = xIsNext ? "X" : "O";
    onPlay(new_squares);
  }

  // this gets run every time one of the states above gets updated
  const winner = checkWinner(squares);

  return (
    <div className="total-board">
      <div className="status">
        {winner ? (
          <p>Winner is {winner}</p>
        ) : (
          <p>Next Player is: {xIsNext ? "X" : "O"}</p>
        )}
      </div>
      <div className="board-row">
        <Square value={squares[0]} onClick={() => onSquareClick(0)} />
        <Square value={squares[1]} onClick={() => onSquareClick(1)} />
        <Square value={squares[2]} onClick={() => onSquareClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onClick={() => onSquareClick(3)} />
        <Square value={squares[4]} onClick={() => onSquareClick(4)} />
        <Square value={squares[5]} onClick={() => onSquareClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onClick={() => onSquareClick(6)} />
        <Square value={squares[7]} onClick={() => onSquareClick(7)} />
        <Square value={squares[8]} onClick={() => onSquareClick(8)} />
      </div>
    </div>
  );
}

function checkWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let isThereNull = false;

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] == squares[b] && squares[b] == squares[c] && squares[a]) {
      return squares[a];
    }
    if (squares[a] == null || squares[b] == null || squares[c] == null) {
      isThereNull = true;
    }
  }

  if (!isThereNull) return "It's a tie!";

  return null;
}

export default function Game() {
  // will be an array of array representing history of the game
  // game can have 9 positions
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 == 0;
  const currentSquares = history[currentMove];

  function handlePlay(new_squares) {
    const nextHistory = [...history.slice(0, currentMove + 1), new_squares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move_idx) => {
    let description;
    if (move_idx > 0) {
      description = "Go to move # " + move_idx;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move_idx + Math.random()}>
        <button onClick={() => jumpTo(move_idx)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="board">
        <Board squares={currentSquares} xIsNext={xIsNext} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
