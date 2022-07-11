import React, { useState, useEffect } from "react";
import Scoreboard from "./Scoreboard";
import "./TicTacToe.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faO } from "@fortawesome/free-solid-svg-icons";

export default function TicTacToe() {
  const [turn, setTurn] = useState("X");

  const [scores, setScores] = useState([
    { playerName: "X", score: 0 },
    { playerName: "O", score: 0 },
  ]);

  function changeTurns() {
    if (turn == "X") {
      setTurn("O");
    } else {
      setTurn("X");
    }
  }

  return (
    <div>
      <Scoreboard scores={scores} gameName="Tic Tac Toe"/>
      <div>{turn}'s turn</div>
      <GameBoard
        turn={turn}
        setTurn={setTurn}
        changeTurns={changeTurns}
        setScores={setScores}
        scores={scores}
      />
    </div>
  );
}

function GameBoard({ turn, setTurn, changeTurns, setScores, scores }) {
  
  const [theBoard, setTheBoard] = useState(Array(9).fill(""));
  const [isGameOver, setIsGameOver] = useState(false);

  function handleCellClicked(index) {
    if (theBoard[index] == "" && !isGameOver) {
      setTheBoard(
        theBoard.map((c, i) => {
          if (i == index) {
            return turn;
          } else {
            return c;
          }
        })
      );
      changeTurns();
    }

    console.log(theBoard);
  }

  function checkForWinner() {
    var winCombo = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let [a, b, c] of winCombo) {
      if (
        theBoard[a] === theBoard[b] &&
        theBoard[a] === theBoard[c] &&
        theBoard[a] !== ""
      ) {
        return theBoard[a];
      }
    }
    return '';
  }

  function onResetClicked() {
      setTheBoard(Array(9).fill(""));
      setIsGameOver(false);
      setTurn('X');
  }

  useEffect(() => {
    let winner = checkForWinner();
    if (winner) {
      setScores([]);
      setScores(
        scores.map((s) => {
          if (s.playerName == winner) {
            return {
              ...s,
              score: s.score + 1,
            };
          } else {
            return s;
          }
        })
      );
      setIsGameOver(true);
    }
  }, [theBoard]);

  return (
      <>
    <div className="game-board">
      {theBoard.map((cell, i) => (
        <div
          onClick={() => {
            handleCellClicked(i);
          }}
        >
          {cell && (
            <FontAwesomeIcon size="4x" icon={cell == "X" ? faXmark : faO} />
          )}
        </div>
      ))}
    </div>
    <button onClick={onResetClicked}>Reset</button>
    </>
  );
}
