import React from 'react'
import './Scoreboard.css'

export default function Scoreboard({ gameName, scores }) {
    //scores: {playerName: string, score: number}[]
  return (
    <div className='score-board-root'> {gameName}
    <div className='scores'>Scores:</div>
    {scores.map((score) => <div className='players'>{score.playerName} - {score.score}</div>)}
        
    </div>
  )
}

