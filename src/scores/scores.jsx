import React from 'react';
import '../app.css';

export function Scores() {
  const [scores, setScores] = React.useState([]);

  React.useEffect(() => {
  fetch('/api/scores')
    .then((response) => response.json())
    .then((scores) => {
      setScores(scores);
    });
}, []);

  // Demonstrates rendering an array with React
  const scoreRows = [];
  if (scores.length) {
    for (const [i, score] of scores.entries()) {
      scoreRows.push(
        <tr key={i}>
          <td>{i+1}</td>
          <td>{score.name.split('@')[0]}</td>
          <td>{score.score}</td>
          <td>{score.time}</td>
        </tr>
      );
    }
  } else {
    scoreRows.push(
      <tr key='0'>
        <td colSpan='4'>Be the first to score</td>
      </tr>
    );
  }
  return (
    <main className="container-fluid back-light text-center">
      <table className="table table-success table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody id='scores'>{scoreRows}</tbody>
      </table>
    </main>
  );
}