const express = require('express');
const db = require('./db/index');



console.log(db.select('kurtiimg').from('kurtis').then(data => console.log(data)));



const app = express();
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Working')
})
app.listen(5000, () => console.log('listening to port 5000'));