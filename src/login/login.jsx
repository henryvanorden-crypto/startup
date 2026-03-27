import React from 'react';
import '../app.css';
import { useNavigate } from 'react-router-dom';

export function Login({setUser}) {
const [text, setText] = React.useState('')
const [password, setPassword] = React.useState('')
const [displayError, setDisplayError] = React.useState(null);
const navigate = useNavigate()

function loginUser(e){
  e.preventDefault()
  loginOrCreate(`/api/auth/login`);
}
function createUser(e){
  e.preventDefault()
  loginOrCreate(`/api/auth/create`);
}

async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: text, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('user', text)
      setUser(text)
      navigate('/play')
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
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
          <input onChange={textChange} className="form-control" type="text" placeholder="username" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">🔒</span>
          <input onChange={passChange} className="form-control" type="password" placeholder="password" />
        </div>
        <button onClick={loginUser} disabled={!text || !password} className="btn but-color">Login</button>
        <button onClick={createUser} disabled={!text || !password} className="btn sec-but">Create</button>
        <div>{displayError}</div>
      </form>
    </main>
  );
}
