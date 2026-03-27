import React from 'react';
import '../app.css';

export function Scores() {
const [scoresData, setScoresData] = React.useState(null);

  React.useEffect(() => {
    fetch('/api/scores')
      .then((response) => response.json())
      .then((data) => {
        setScoresData(data);
      });
  }, []);

  if (!scoresData) {
    return <div>Loading leaderboard...</div>;
  }

  const { date, scores, yesterdayWinner } = scoresData;

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

  const displayDate = date
    ? new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    : '';

  return (
    <main className="container-fluid back-light text-center">
      <h2>{displayDate}</h2>
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
      {yesterdayWinner && (
        <div className="yesterday-winner mt-3">
          Yesterday's winner: {yesterdayWinner.name.split('@')[0]} ({yesterdayWinner.score})
        </div>
      )}
    </main>
  );
}