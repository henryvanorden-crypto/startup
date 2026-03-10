const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.use(express.static('public'));

const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

app.use(express.json());

let users = [];
let scores = [];

let apiRouter = express.Router();
app.use(`/api`, apiRouter);


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});