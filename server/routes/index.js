var express = require('express');
var router = express.Router();
const db = require("../db")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/counters', (req, res) => {
  db.all('SELECT * FROM counters', (err, rows) => {
  res.send(rows)
  })
})
router.post('/counters', (req, res) => {
  db.run(`INSERT INTO counters VALUES (${req.body.id}, ${1}) ON CONFLICT(key) DO UPDATE SET counter=${req.body.Count + 1}`)
  res.send("Ok");
})
router.get('/cookies', (req, res) => {
  db.run(`SELECT votes FROM sessions WHERE token=${req.body.token}`);
})

router.post('/cookies', (req, res) => {
  console.log(req.body)
  db.run(`INSERT INTO sessions VALUES (token, ${req.body.votes}) ON CONFLICT(key) DO UPDATE SET votes=${req.body.votes}`)
})

module.exports = router;
