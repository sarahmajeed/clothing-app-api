const express = require('express');
const db = require('./db/index');
const cors = require('cors');




const app = express();
app.use(express.json());
app.use(cors());


app.get('/women/kurtis', (req, res) => {
  db.select('kurtiimg', 'tag', 'kurtiprice').from('kurtis')
    .then(data => res.send(data))
    .catch(err => console.log(err))
})
app.get('/women/trousers', (req, res) => {
  db.select('trouserimg', 'tag', 'trouserprice').from('trousers')
    .then(data => res.send(data))
    .catch(err => console.log(err))
})
app.get('/men/shirts', (req, res) => {
  db.select('shirtimg', 'tag', 'shirtprice').from('shirts')
    .then(data => res.send(data))
    .catch(err => console.log(err))
})
app.get('/men/pants', (req, res) => {
  db.select('pantimg', 'tag', 'pantprice').from('pants')
    .then(data => res.send(data))
    .catch(err => console.log(err))
})
app.get('/men/kurta', (req, res) => {
  db.select('kurtaimg', 'tag', 'kurtaprice').from('kurtas')
    .then(data => res.send(data))
    .catch(err => console.log(err))
})
app.get('/accessories', (req, res) => {
  db.select('accimg', 'tag', 'accprice').from('accessories')
    .then(data => res.send(data))
    .catch(err => console.log(err))
})
app.listen(5000, () => console.log('listening to port 5000'));