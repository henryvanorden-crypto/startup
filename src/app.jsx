import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';
import { About } from './about/about';

export default function App() {
  return (
    <BrowserRouter>
        <div className="body back-dark">
            <header className="container-fluid">
            <nav className="navbar fixed-top">
                <div className="navbar-brand">TriviaDash</div>
                <menu className="navbar-nav">
                <li className="nav-item"><NavLink to="/" className="nav-link">Home</NavLink></li>
                <li className="nav-item"><NavLink to="play" className="nav-link">Play</NavLink></li>
                <li className="nav-item"><NavLink to="scores" className="nav-link">Scores</NavLink></li>
                <li className="nav-item"><NavLink to="about" className="nav-link">About</NavLink></li>
                </menu>
            </nav>
            </header>
            <main>
                <Routes>
                    <Route path='/' element={<Login />} exact />
                    <Route path='/play' element={<Play />} />
                    <Route path='/scores' element={<Scores />} />
                    <Route path='/about' element={<About />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </main>
            <footer>
            <div className="container-fluid">
                <span className="text-reset">Henry Van Orden</span>
                <a href="https://github.com/henryvanorden-crypto/startup">GitHub</a>
            </div>
            </footer>
        </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}