import React from 'react';
import '../app.css';
import { useNavigate } from 'react-router-dom';

export function Login({setUser}) {
const [text, setText] = React.useState('')
const [password, setPassword] = React.useState('');
const [displayError, setDisplayError] = React.useState(null);
const navigate = useNavigate()

function loginUser(){
  localStorage.setItem('user', text)
  setUser(text)
  navigate('/play')
}
function createUser(){
  localStorage.setItem('user', text)
  setUser(text)
  navigate('/play')
}

function textChange(e){
  setText(e.target.value)
}

function passChange(e){
  setPassword(e.target.value)
}

  return (
    <main className="container-fluid back-light text-center">
      <h1>Welcome to TriviaDash</h1>
      <form>
        <div className="input-group mb-3">
          <span className="input-group-text">@</span>
          <input onChange={textChange} className="form-control" type="text" placeholder="your@email.com" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">🔒</span>
          <input onChange={passChange} className="form-control" type="password" placeholder="password" />
        </div>
        <button onClick={loginUser} disabled={!text || !password} className="btn but-color">Login</button>
        <button onClick={createUser} disabled={!text || !password} className="btn sec-but">Create</button>
      </form>
    </main>
    
  );
}
