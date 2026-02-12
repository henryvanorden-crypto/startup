import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return <div className="body bg-dark text-light">
    <header className="container-fluid">
      <nav className="navbar fixed-top">
        <a className="navbar-brand" href="index.html">TriviaDash</a>
        <menu className="navbar-nav">
          <li className="nav-item"><a href="index.html" className="nav-link active">Home</a></li>
          <li className="nav-item"><a href="play.html" className="nav-link">Play</a></li>
          <li className="nav-item"><a href="scores.html" className="nav-link">Scores</a></li>
          <li className="nav-item"><a href="about.html" className="nav-link">About</a></li>
        </menu>
      </nav>
    </header>

    <main className="container-fluid back-light text-center">
      This is main
    </main>

    <footer>
      <div className="container-fluid">
        <span className="text-reset">Henry Van Orden</span>
        <a href="https://github.com/henryvanorden-crypto/startup">GitHub</a>
      </div>
    </footer>
    </div>;
}