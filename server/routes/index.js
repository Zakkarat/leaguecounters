var express = require('express');
var router = express.Router();
const path = require('path');
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
  db.run(`INSERT INTO counters VALUES (${req.body.id}, ${1}) ON CONFLICT(key) DO UPDATE SET counter=${req.body.Count + 1}`);
  res.send("Ok");
})
router.get('/cookies', (req, res) => {
  const token = decodeURIComponent(req.url.split('token=')[1]);
  db.all(`SELECT * FROM sess WHERE token="${token}"`, (err, rows) => {
    res.send(rows);
  });
})
router.post('/cookies', (req, res) => {
  db.run(`INSERT INTO sess VALUES ("${req.body.token}", ${req.body.votes}) ON CONFLICT(token) DO UPDATE SET votes=${req.body.votes}`)
  res.send("Ok");
})

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

module.exports = router;
