import React from 'react';
import '../app.css';

export function Scores() {
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
        <tbody>
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>10</td>
            <td>1:01</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jane Doe</td>
            <td>9</td>
            <td>1:32</td>
          </tr>
          <tr>
            <td>3</td>
            <td>User04</td>
            <td>9</td>
            <td>1:43</td>
          </tr>
          <tr>
            <td>4</td>
            <td>User03</td>
            <td>8</td>
            <td>0:59</td>
          </tr>
          <tr>
            <td>5</td>
            <td>User12</td>
            <td>7</td>
            <td>0:48</td>
          </tr>
          <tr>
            <td>-</td>
            <td>You</td>
            <td>5</td>
            <td>2:19</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}