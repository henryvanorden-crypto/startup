import React from 'react';
import '../app.css';

export function Play() {
  const [pause, setPause] = React.useState(true)
  function pauseGame(){
    setPause(true)
    //pause timer
  }
  function playGame(){
    setPause(false)
    //start timer
  }
  function endGame(){
    pauseGame()
    //record username, score, time
    //show message showing score/time and saying "Play again tomorrow!"
  }
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
          <label for="count">Score</label>
          <input type="text" id="count" value="--" readonly />
          <label for="count">/10</label>
        </div>
        <div>
          Timer: <span id="timer">00:00</span>
        </div>
      </div>

      <div className="quiz">
        <p id="quiz-question">
          Question 1: How many days are in a year?
        </p>
        <div className="quiz-answers">
          <label for="radio1">
          <input type="radio" id="radio1" name="varRadio" value="radio1" checked />
          365</label>
          <label for="radio2">
          <input type="radio" id="radio2" name="varRadio" value="radio2" />
          356</label>
          <label for="radio3">
          <input type="radio" id="radio3" name="varRadio" value="radio3" />
          635</label>
          <label for="radio4">
          <input type="radio" id="radio4" name="varRadio" value="radio3" />
          31</label>
        </div>
        {pause && <button onClick={playGame} type="submit" className="btn but-color">Play</button>}
        {!pause && <button onClick={pauseGame} type="submit" className="btn sec-but">Pause</button>}
        {!pause && <button type="submit" className="btn but-color">Submit</button>}
      </div>
    </main>
  );
}