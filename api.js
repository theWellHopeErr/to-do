const express = require("express");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const api = express.Router();

api.use(bodyParser.json());

var pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})


// Hashing Function
function hash(input, salt) {
  var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, "sha512");
  return ["pdkdf2", "10000", salt, hashed.toString("hex")].join("$");
}


// Endpoint: /api/whoami
api.post("/whoami", (req, res) => {
  if (req.session.user) {
    var user = {
      id: req.session.user.id,
      name: req.session.user.name,
    }
    res.status(200).send(user)
  }
  else
    res.send(null)
})


// Endpoint: /api/signup
api.post("/signup", (req, res, next) => {
  if (req.body.email && req.body.user && req.body.pass)
    next();
  else
    res.status(400).send({ error: "Request body is incomplete" });
}, (req, res) => {
  var { email, user, pass } = req.body;
  var salt = crypto.randomBytes(128).toString("hex");
  var hashedPassword = hash(pass, salt);
  pool.query(`INSERT INTO users(email, username,password) VALUES($1,$2,$3)`, [email, user, hashedPassword]
    , (err) => {
      if (err) {
        console.log(err.toString());
        res.status(500).send({ error: "Something's fishy" });
      }
      else
        console.log("Sign Up Success");
      pool.query(`SELECT id, username, password FROM users WHERE username = $1`, [user]
        , (err, results) => {
          if (err) {
            console.log(err.toString());
            res.status(500).send({ error: "Something's fishy" })
          }
          else {
            var user = {
              id: results.rows[0].id,
              name: results.rows[0].username,
            }
            req.session.user = user
          }
          res.status(200).send(req.session.user)
        }
      );
    });
})


// Endpoint: /api/signin
api.post("/signin", (req, res, next) => {
  if (req.body.user && req.body.pass)
    next();
  else
    res.status(400).send({ error: "Request body is incomplete" });
}, (req, res) => {
  var { user, pass } = req.body;
  pool.query(`SELECT id, username, password FROM users WHERE username = $1`, [user]
    , (err, results) => {
      if (err) {
        console.log(err.toString())
        res.status(500).send({ error: "Something's fishy" })
      }
      else
        if (results.rows.length == 0) {
          res.status(403).send({ error: "I don't know you" })
          console.log("I don't know you");
        }
        else {
          var actualhashed = results.rows[0].password
          var salt = actualhashed.split('$')[2]
          var givenhashed = hash(pass, salt)
          if (givenhashed === actualhashed) {
            console.log("Signed in");
            var user = {
              id: results.rows[0].id,
              name: results.rows[0].username,
            }
            req.session.user = user

            res.status(200).send(req.session.user)
          }
          else {
            res.status(403).send({ error: "This is why I told you not to forget you're password" })
            console.log("This is why I told you not to forget you're password")
          }
        }
    })
})


// Endpoint: /api/signout
api.post('/signout', (req, res) => {
  delete req.session.user
  res.status(200).send({ message: "See you later" })
})

api.use((req, res, next) => {
  if (req.session.user)
    next()
  else
    res.status(401).send({ error: 'I think you forgot to sign in.' })
})


//Endpoint: /api/
api.get('/', (req, res) => {
  if (req.session.user) {
    var id = req.session.user.id
    pool.query(`SELECT id, task, completed FROM tasks WHERE userid = $1;`, [id]
      , (err, results) => {
        if (err)
          console.log(err);
        else {
          var tasks = results.rows
          res.status(200).send(tasks)
        }
      })
  }
  else
    res.status(401).send({ error: 'I think you forgot to sign in.' })
})


//Endpoint: /api/new-task
api.post('/new-task', (req, res, next) => {
  if (req.body.userID && req.body.task)
    next()
  else {
    res.status(400).send({ error: "Request body is incomplete" })
  }
}, (req, res) => {
  var { userID, task } = req.body
  pool.query(`INSERT INTO tasks (userID, task, completed) VALUES ($1, $2, $3);`, [userID, task, 't']
    , (err) => {
      if (err) {
        console.log(err.toString());
        res.status(500).send({ error: "Something's fishy" })
      }
      else {
        res.status(200).send({ message: "Task added successfully" })
      }
    })
})



module.exports = api;
