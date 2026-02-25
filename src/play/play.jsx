import React from 'react';
import '../app.css';
import { triviaQuestions } from './service';
import { useNavigate } from 'react-router-dom';

export function Play({ user, logout }) {
  const [pause, setPause] = React.useState(true)
  const [time, setTime] = React.useState(0)
  const [qIndex, setQIndex] = React.useState(0)
  const [score, setScore] = React.useState(0)
  const [selectedAnswer, setSelectedAnswer] = React.useState(null)
  const [gameOverMessage, setGameOverMessage] = React.useState(null);
  const questionSet = triviaQuestions()
  const currentQuestion = questionSet[qIndex]
  const navigate = useNavigate();

  //timer
  React.useEffect(() => {
  if (pause) {
    return;
  }

  const intervalId = setInterval(() => {
    setTime(prevTime => prevTime + 1);
  }, 1000);

  return () => clearInterval(intervalId);
}, [pause]);
const minutes = Math.floor(time / 60)
const seconds = time % 60

  function pauseGame(){
    setPause(true)
  }
  function playGame(){
    setPause(false)
  }
  function submit(){
    let newScore = score
    if (currentQuestion.correctIndex == selectedAnswer){
      newScore = score + 1
      setScore(newScore)
    }
    const nextIndex = qIndex + 1;
    if (nextIndex > 9) {
      endGame(newScore);
    } else {
      setQIndex(nextIndex);
    }
  }
  function endGame(finalScore){
    pauseGame()
    //record username, score, time
    localStorage.setItem('gameOver', 'true')
    localStorage.setItem('lastScore', finalScore)
    const finalTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    localStorage.setItem('lastTime', finalTime)
    setGameOverMessage(<>Game over!<br />Your score: {finalScore} Your time: {finalTime}<br />Come back tomorrow!</>);
  }
  React.useEffect(() => {
  if (localStorage.getItem('gameOver') === 'true') {
    setGameOverMessage(<>Game over!<br />Your score: {localStorage.getItem('lastScore')} Your time: {localStorage.getItem('lastTime')}<br />Come back tomorrow!</>);
    setPause(true)
  }
}, [])
  return (
    <main className="container-fluid back-light text-center">
      <div className="players">
        Player
        <span className="player-name">Mystery player</span>
        <div id="player-messages">
          <div className="event"><span className="player-event">Linus</span> started a new game</div>
          <div className="event"><span className="player-event">Tim</span> scored 10</div>
          <div className="event"><span className="system-event">game</span> connected</div>
        </div>
      </div>

      <div className="quiz-header">
        <div>
          <label for="count">Score: {score}/10</label>
        </div>
        <div>
          Timer: <span id="timer">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
        </div>
      </div>
      {gameOverMessage && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>{gameOverMessage}</p>
            <button onClick={() => navigate('/scores')} className="btn but-color">Leaderboard</button>
            <button onClick={logout} className="btn sec-but">Logout</button>
          </div>
        </div>
      )}
      <div className="quiz">
        <p id="quiz-question">
          Question {qIndex + 1}: {currentQuestion.question}
        </p>
        <div className="quiz-answers">
          {currentQuestion.choices.map((choice, index) => (
  <label key={index}>
    <input type="radio" value={index} name="answer" onChange={() => setSelectedAnswer(index)} />
    {choice}
  </label>
))}
        </div>
        {pause && <button onClick={playGame} type="submit" className="btn but-color">Play</button>}
        {!pause && <button onClick={pauseGame} type="submit" className="btn sec-but">Pause</button>}
        {!pause && <button onClick={submit} type="submit" className="btn but-color">Submit</button>}
      </div>
    </main>
  );
}