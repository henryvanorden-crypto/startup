import React from 'react';
import '../app.css';

export function Login() {
  return (
    <main className="container-fluid back-light text-center">
      <h1>Welcome to TriviaDash</h1>
      <form method="get" action="play.html">
        <div className="input-group mb-3">
          <span className="input-group-text">@</span>
          <input className="form-control" type="text" placeholder="your@email.com" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">🔒</span>
          <input className="form-control" type="password" placeholder="password" />
        </div>
        <button type="submit" className="btn but-color">Login</button>
        <button type="submit" className="btn sec-but">Create</button>
      </form>
    </main>
  );
}