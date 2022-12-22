const connectToMongo = require('./db');
connectToMongo();

const express = require('express')
const app = express()
const port=3000;
// first endpoint

app.use(express.json())
// available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
  

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`);
})