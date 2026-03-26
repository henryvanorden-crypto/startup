const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

function getDateString(date = new Date()) {
  return date.toLocaleDateString('en-CA', {
    timeZone: 'America/Denver', // Mountain Time
  });
}
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

apiRouter.get('/canPlay', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  const today = getDateString(new Date());

  const canPlay = user.lastPlayed !== today;

  res.send({
    canPlay,
    lastScore: user.lastScore,
    lastTime: user.lastTime,
  });
});

// GetScores
apiRouter.get('/scores', verifyAuth, async (req, res) => {
  const today = getDateString(new Date());
  const scores = await DB.getHighScores(today);
  res.send(scores);
});

// SubmitScore
apiRouter.post('/score', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  const today = getDateString(new Date());

  user.lastPlayed = today;

  user.lastScore = req.body.score;
  user.lastTime = req.body.time;

  await DB.updateUser(user);

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


// updateScores considers a new score for inclusion in the high scores

async function updateScores(newScore) {
  const today = getDateString(new Date());

  newScore.date = today;

  await DB.addScore(newScore);

  return DB.getHighScores(today);
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

async function fetchTriviaFromAPI() {
  const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
  return await response.json();
}

apiRouter.get('/trivia', async (req, res) => {
  const today = getDateString(new Date());

  // Check DB first
  let trivia = await DB.getTriviaByDate(today);

  if (!trivia) {
    // Fetch new trivia
    const apiData = await fetchTriviaFromAPI();
    trivia = { date: today, questions: apiData.results };

    // Save to DB
    await DB.saveTrivia(today, trivia.questions);
  }

  res.send({ results: trivia.questions });
});



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