import React from 'react';
import '../app.css';
import { getTrivia } from './service';
import { useNavigate } from 'react-router-dom';

export function Play({ user, logout }) {
  const [pause, setPause] = React.useState(true)
  const [time, setTime] = React.useState(0)
  const [qIndex, setQIndex] = React.useState(0)
  const [score, setScore] = React.useState(0)
  const [selectedAnswer, setSelectedAnswer] = React.useState(null)
  const [gameOverMessage, setGameOverMessage] = React.useState(null);
  const navigate = useNavigate();
  const [msg, setMsg] = React.useState('...listening')
  const [questionSet, setQuestionSet] = React.useState(null);
  const [quizDate, setQuizDate] = React.useState(null);

React.useEffect(() => {
  async function loadTrivia() {
    try {
      const trivia = await getTrivia();
      console.log("Trivia fetched from API:", trivia);
      setQuestionSet(trivia.results);
      setQuizDate(trivia.date);
    } catch (err) {
      console.error("Trivia load failed:", err);
    }
  }
  loadTrivia();
}, []);

React.useEffect(() => {
  const intervalId = setInterval(() => {
    const names = ['bob', 'sue', 'tim'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomCount = Math.floor(Math.random() * 11);
    const newMsg = `${randomName} scored ${randomCount}`;
    setMsg(newMsg);
  }, 2000);

  return () => clearInterval(intervalId);
}, []);

React.useEffect(() => {
  if (pause) {
    return;
  }

  const intervalId = setInterval(() => {
    setTime(prevTime => prevTime + 1);
  }, 1000);

  return () => clearInterval(intervalId);
}, [pause]);

React.useEffect(() => {
  async function checkCanPlay() {
    const res = await fetch('/api/canPlay');
    const data = await res.json();

    if (!data.canPlay) {
      setGameOverMessage(
        <>You already played today!<br />
          Your score: {data.lastScore} Your time: {data.lastTime}<br />
          Come back tomorrow!
        </>
      );
      setPause(true);
    }
  }

  checkCanPlay();
}, []);


if (!questionSet) {
  return <div>Loading trivia...</div>;
}
const currentQuestion = questionSet[qIndex]

  async function saveScore(score, time, totalSeconds) {
    const newScore = { name: user, score: score, time: time, totalSeconds: totalSeconds, date: quizDate };

    // Let other players know the game has concluded
    //GameNotifier.broadcastEvent(userName, GameEvent.End, newScore);

    await fetch('/api/score', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(newScore),
  });
  }

  

  //timer
  
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
  function endGame(finalScore) {
  pauseGame();
  const totalSeconds = minutes * 60 + seconds;
  const finalTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  setGameOverMessage(
    <>Game over!<br />
      Your score: {finalScore} Your time: {finalTime}<br />
      Come back tomorrow!
    </>
  );

  saveScore(finalScore, finalTime, totalSeconds);
}

  
  return (
    <main className="container-fluid back-light text-center">
      <div className="players">
        {msg}
      </div>

      <div className="quiz-header">
        <div>
          <label htmlFor="count">Score: {score}/10</label>
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
        {!pause && <p id="quiz-question">
          Question {qIndex + 1}: {currentQuestion.question}
        </p>}
        {!pause && <div className="quiz-answers">
          {currentQuestion.choices.map((choice, index) => (
  <label key={index}>
    <input type="radio" value={index} name="answer" onChange={() => setSelectedAnswer(index)} />
    {choice}
  </label>
))}
        </div>}
        {pause && <button onClick={playGame} type="submit" className="btn but-color">Play</button>}
        {!pause && <button onClick={pauseGame} type="submit" className="btn sec-but">Pause</button>}
        {!pause && <button onClick={submit} type="submit" className="btn but-color">Submit</button>}
      </div>
    </main>
  );
}