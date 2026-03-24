const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('../testMongo/database.js');

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

// let users = [];
// let scores = [];

app.use(cookieParser());

app.use(express.static('public'));

const apiRouter = express.Router(); //replace let with const
app.use(`/api`, apiRouter);


// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    await DB.updateUserRemoveAuth(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

//come back to for database edits
apiRouter.get('/canPlay', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  const today = new Date().toISOString().split('T')[0];

  const canPlay = user.lastPlayed !== today;

  res.send({
    canPlay,
    lastScore: user.lastScore,
    lastTime: user.lastTime,
  });
});

// GetScores
//added async, changed _req to req, added const line
apiRouter.get('/scores', verifyAuth, async (req, res) => {
  const scores = await DB.getHighScores();
  res.send(scores);
});

// SubmitScore
//come back to for database edits, edited 2nd to last line
apiRouter.post('/score', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  const today = new Date().toISOString().split('T')[0];

  // Save daily limit
  user.lastPlayed = today;

  // Save last score/time
  user.lastScore = req.body.score;
  user.lastTime = req.body.time;

  const scores = await updateScores(req.body);
  res.send(scores);
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

//come back to for database edits
// updateScores considers a new score for inclusion in the high scores.
function getDateString(date) {
  return date.toISOString().split('T')[0];
}

let lastReset = getDateString(new Date());

function updateScores(newScore) {
  const today = getDateString(new Date());

  if (today !== lastReset) {
    scores = [];
    lastReset = today;
  }

  let found = false;
  for (const [i, prevScore] of scores.entries()) {
    if (newScore.score > prevScore.score) {
      scores.splice(i, 0, newScore);
      found = true;
      break;
    } else if (newScore.score === prevScore.score) {
      if (newScore.totalSeconds < prevScore.totalSeconds) {
        scores.splice(i, 0, newScore);
        found = true;
        break;
      }
    }
  }

  if (!found) {
    scores.push(newScore);
  }

  if (scores.length > 10) {
    scores.length = 10;
  }

  return scores;
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
    lastPlayed: null,
    lastScore: null,
    lastTime: null,
  };
  await DB.addUser(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  if (field === 'token') {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
}

//come back to for database edits
let todayTrivia = [];
let lastTriviaDate = getDateString(new Date());
apiRouter.get('/trivia', async (req, res) => {
  const today = getDateString(new Date());

  if (todayTrivia.length === 0 || today !== lastTriviaDate) {
    const apiData = await fetchTriviaFromAPI();
    todayTrivia = apiData.results;
    lastTriviaDate = today;
  }

  res.send({ results: todayTrivia });
});
async function fetchTriviaFromAPI() {
  const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
  return await response.json();
}


// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}


const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});